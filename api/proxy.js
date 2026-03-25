const axios = require('axios');

export default async function handler(req, res) {
    // 1. Ambil URL dari query string
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Mana URL-nya, Sis?" });
    }

    try {
        // 2. Tembak ke API Sansekai dengan Header lengkap
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Origin': 'https://api.sansekai.my.id',
                'Referer': 'https://api.sansekai.my.id/'
            },
            timeout: 10000 // Maksimal 10 detik biar gak timeout
        });

        // 3. Set Header CORS biar Browser gak marah
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

        // 4. Kirim hasilnya balik ke Web lu
        return res.status(200).json(response.data);

    } catch (error) {
        console.error("PROXY ERROR:", error.message);
        return res.status(500).json({ 
            error: "Gagal ambil data dari Sansekai", 
            detail: error.message 
        });
    }
}
