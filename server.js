const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { sequelize } = require('./models');

// Importar rotas
const pauseReasonRoutes = require('./routes/pauseReasonRoutes');
const documentTypeRoutes = require('./routes/documentTypeRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');
const storeRoutes = require('./routes/storeRoutes');
const causeLossRoutes = require('./routes/causeLossRoutes');
const evaluationTypeRoutes = require('./routes/evaluationTypeRoutes');
const questionRoutes = require('./routes/questionRoutes');
const standardPhraseRoutes = require('./routes/standardPhraseRoutes');
const auditMaintenanceRoutes = require('./routes/auditMaintenanceRoutes');
const salesReportRoutes = require('./routes/salesReportRoutes');
const auditAssignmentRoutes = require('./routes/auditAssignmentRoutes');  // Adicione esta linha

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Usar rotas
app.use('/api/pauseReasons', pauseReasonRoutes);
app.use('/api/documentTypes', documentTypeRoutes);
app.use('/api/paymentMethods', paymentMethodRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/causeLosses', causeLossRoutes);
app.use('/api/evaluationTypes', evaluationTypeRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/standardPhrases', standardPhraseRoutes);
app.use('/api/auditMaintenances', auditMaintenanceRoutes);
app.use('/api/salesReports', salesReportRoutes);
app.use('/api/auditAssignments', auditAssignmentRoutes);  // Adicione esta linha

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

module.exports = app;
