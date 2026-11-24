import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const pincode = searchParams.get('pincode');

    // 1. Lookup by Pincode
    if (pincode && /^[1-9][0-9]{5}$/.test(pincode.trim())) {
      try {
        const pinRes = await fetch(`https://api.postalpincode.in/pincode/${pincode.trim()}`, {
          next: { revalidate: 86400 }, // cache for 1 day
        });
        const pinData = await pinRes.json();
        if (Array.isArray(pinData) && pinData[0]?.Status === 'Success' && pinData[0].PostOffice?.length > 0) {
          const po = pinData[0].PostOffice[0];
          const city = po.Division?.replace(/ Division$/i, '') || po.District || po.Region || po.Block || '';
          const state = po.State || '';
          return NextResponse.json({
            success: true,
            data: {
              city: city.replace(/ City$/i, ''),
              state,
              pincode: pincode.trim(),
            },
          });
        }
      } catch (pinErr) {
        console.warn('Pincode lookup error:', pinErr);
      }
    }

    // 2. Reverse Geocode by Lat & Lng
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);

      if (isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json({ success: false, error: 'Invalid coordinates' }, { status: 400 });
      }

      // Try Nominatim (OpenStreetMap) first
      try {
        const nomRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              'User-Agent': 'AbhisGifts-App/1.0 (abhisgifts@gmail.com)',
              'Accept-Language': 'en',
            },
            next: { revalidate: 3600 },
          }
        );

        if (nomRes.ok) {
          const nomData = await nomRes.json();
          const addr = nomData?.address || {};

          const extractedPin = addr.postcode ? addr.postcode.replace(/\D/g, '').slice(0, 6) : '';
          const extractedCity =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.city_district ||
            addr.county ||
            addr.state_district ||
            '';
          const extractedState = addr.state || '';
          const extractedRoad = addr.road || '';
          const extractedNeighbourhood = addr.neighbourhood || addr.suburb || '';
          const extractedLandmark = addr.amenity || addr.building || extractedNeighbourhood || '';

          const streetParts = [extractedRoad, extractedNeighbourhood].filter(Boolean);
          const streetAddress = streetParts.length > 0 ? streetParts.join(', ') : '';

          if (extractedCity || extractedState || extractedPin) {
            return NextResponse.json({
              success: true,
              data: {
                pincode: extractedPin,
                city: extractedCity,
                state: extractedState,
                streetAddress,
                landmark: extractedLandmark,
                displayName: nomData.display_name || '',
              },
            });
          }
        }
      } catch (nomErr) {
        console.warn('Nominatim reverse geocode error, falling back:', nomErr);
      }

      // Fallback: BigDataCloud Reverse Geocode API
      try {
        const bdcRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        if (bdcRes.ok) {
          const bdcData = await bdcRes.json();
          const extractedPin = bdcData.postcode ? bdcData.postcode.replace(/\D/g, '').slice(0, 6) : '';
          const extractedCity = bdcData.city || bdcData.locality || '';
          const extractedState = bdcData.principalSubdivision || '';
          const extractedLocality = bdcData.locality || '';

          return NextResponse.json({
            success: true,
            data: {
              pincode: extractedPin,
              city: extractedCity,
              state: extractedState,
              streetAddress: extractedLocality,
              landmark: extractedLocality,
              displayName: `${extractedCity}, ${extractedState}`,
            },
          });
        }
      } catch (bdcErr) {
        console.warn('BigDataCloud geocode error:', bdcErr);
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Could not determine location for provided parameters',
    });
  } catch (error: any) {
    console.error('Geocode API handler error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Geocoding service error' },
      { status: 500 }
    );
  }
}
