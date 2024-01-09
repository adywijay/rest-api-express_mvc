const requiredParams = ['id_bio'];
requiredParams.forEach((value) => {
    if (!req.body[value]) {
        return res.status(400).json({ error: `field '${value}' is missing` });
    }
});