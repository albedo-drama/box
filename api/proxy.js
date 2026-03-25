const axios = require('axios');

export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    try {
        const response = await axios.get(url, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*'
            }
        });
        // Berikan akses CORS agar Browser tidak protes
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Proxy Failed", message: error.message });
    }
}
