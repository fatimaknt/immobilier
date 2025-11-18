import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';

interface BookingFormProps {
  open: boolean;
  onClose: () => void;
  type: 'apartment' | 'car';
  item: { id: string; title?: string; brand?: string; model?: string; price_per_day: number;[key: string]: unknown };
}

const BookingForm: React.FC<BookingFormProps> = ({ open, onClose, type, item }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    message: '',
  });

  const steps = ['Informations de réservation', 'Détails personnels', 'Confirmation'];

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, value: Date | null) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    if (!formData.startDate || !formData.endDate) return 0;

    const days = Math.ceil(
      (formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return days * item.pricePerDay;
  };

  const handleSubmit = () => {
    // Ici, vous enverriez les données à votre API
    console.log('Booking data:', formData);
    handleNext(); // Passer à l'étape de confirmation
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">Réservation {type === 'apartment' ? "d'appartement" : 'de voiture'}</Typography>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date d'arrivée"
                  value={formData.startDate}
                  onChange={(date) => handleDateChange('startDate', date)}
                  minDate={new Date()}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date de départ"
                  value={formData.endDate}
                  onChange={(date) => handleDateChange('endDate', date)}
                  minDate={formData.startDate || new Date()}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              {formData.startDate && formData.endDate && (
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Durée: {Math.ceil(
                      (formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24)
                    )} jours
                  </Typography>
                  <Typography variant="h6" color="primary">
                    Total: {calculateTotal().toLocaleString()} FCFA
                  </Typography>
                </Grid>
              )}
            </Grid>
          </LocalizationProvider>
        )}

        {activeStep === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="firstName"
                label="Prénom"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="lastName"
                label="Nom"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="phone"
                label="Téléphone"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="message"
                label="Message (optionnel)"
                multiline
                rows={4}
                fullWidth
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        )}

        {activeStep === 2 && (
          <Box textAlign="center">
            <Typography variant="h5" color="primary" gutterBottom>
              Réservation confirmée !
            </Typography>
            <Typography variant="body1" gutterBottom>
              Merci {formData.firstName} {formData.lastName} pour votre réservation.
            </Typography>
            <Typography variant="body1">
              Nous vous contacterons rapidement au {formData.phone} pour finaliser les détails.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        {activeStep > 0 && activeStep < 2 && (
          <Button onClick={handleBack}>
            Retour
          </Button>
        )}

        {activeStep < 1 && (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!formData.startDate || !formData.endDate}
          >
            Suivant
          </Button>
        )}

        {activeStep === 1 && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
          >
            Confirmer la réservation
          </Button>
        )}

        {activeStep === 2 && (
          <Button variant="contained" onClick={onClose}>
            Fermer
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookingForm;