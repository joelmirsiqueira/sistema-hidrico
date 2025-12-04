import { Router } from "express";

export const router = Router();

router.get('/', (req, res) => {
    return res.send('ok');
});

router.get('/:text', (req, res) => {
    return res.send(`${req.params.text}`);
});