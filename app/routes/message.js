const router = require('express').Router();
const conversationManager = require('../managers/conversation');
const messageManager = require('../managers/message');
const conversationValidations = require('../validations/conversation');
const getErrorDetails = require('../utils/error-details');
const auth = require('../middlewares/auth');

router.post('/create', auth, async (req, res) => {
    try {
        const error = conversationValidations.create(req.body).error;
        if (error)
            return res.status(400).send(getErrorDetails(error));

        conversation = await conversationManager.create(req.body);
        return res.status(200).send(conversation);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/all', auth, async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        conversations = await conversationManager.getAll(userId);
        return res.status(200).send(conversations);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/:conversationId', auth, async (req, res) => {
    try {
        const error = conversationValidations.conversationId(req.params).error;
        if (error)
            return res.status(400).send(getErrorDetails(error));

        const conversationId = req.params.conversationId;
        const t = await messageManager.getByConversationId(conversationId);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;