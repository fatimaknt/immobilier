'use client';

import React from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    useTheme,
    Fade,
    Divider,
    Link,
} from '@mui/material';
import {
    Gavel as GavelIcon,
} from '@mui/icons-material';

export default function TermsPage() {
    const theme = useTheme();

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', py: 8 }}>
            <Container maxWidth="lg">
                <Fade in timeout={1000}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 6,
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        }}
                    >
                        <Box textAlign="center" sx={{ mb: 6 }}>
                            <GavelIcon
                                sx={{
                                    fontSize: 60,
                                    color: theme.palette.primary.main,
                                    mb: 2,
                                }}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Conditions d&apos;Utilisation
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Résidence Cedo - Termes et conditions
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                1. Acceptation des conditions
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                En accédant et en utilisant le site web de Résidence Cedo, vous acceptez d&apos;être lié par ces
                                conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser
                                notre site web ou nos services.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                2. Description des services
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                                Résidence Cedo propose les services suivants :
                            </Typography>
                            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                                <li>Location d&apos;appartements meublés à court et long terme</li>
                                <li>Location de véhicules pour particuliers et professionnels</li>
                                <li>Services de conciergerie et assistance clientèle</li>
                                <li>Réservation en ligne via notre plateforme web</li>
                            </ul>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                3. Conditions de réservation
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                3.1 Appartements
                            </Typography>
                            <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
                                <li>Durée minimale de location : 1 nuit</li>
                                <li>Caution obligatoire équivalente à 2 nuits</li>
                                <li>Check-in : 15h00 - Check-out : 11h00</li>
                                <li>Paiement : 50% à la réservation, 50% à l&apos;arrivée</li>
                            </ul>

                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                3.2 Véhicules
                            </Typography>
                            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                                <li>Permis de conduire valide obligatoire (+ de 21 ans)</li>
                                <li>Caution bloquée sur carte bancaire</li>
                                <li>Assurance tous risques incluse</li>
                                <li>Carburant : remise dans l&apos;état de prise</li>
                            </ul>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                4. Paiements et annulations
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                4.1 Modes de paiement acceptés
                            </Typography>
                            <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
                                <li>Carte bancaire (Visa, Mastercard)</li>
                                <li>Virement bancaire</li>
                                <li>Paiement à la livraison/remise des clés</li>
                                <li>Mobile Money (Orange Money, Wave)</li>
                            </ul>

                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                4.2 Politique d&apos;annulation
                            </Typography>
                            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                                <li>Annulation gratuite jusqu&apos;à 48h avant l&apos;arrivée</li>
                                <li>Annulation entre 24h et 48h : 50% du montant total</li>
                                <li>Annulation moins de 24h : 100% du montant total</li>
                                <li>No-show : 100% du montant total facturé</li>
                            </ul>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                5. Responsabilités du client
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                                En utilisant nos services, vous vous engagez à :
                            </Typography>
                            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                                <li>Fournir des informations exactes et complètes</li>
                                <li>Respecter les biens loués et les rendre en bon état</li>
                                <li>Respecter le règlement intérieur des appartements</li>
                                <li>Signaler immédiatement tout dommage ou problème</li>
                                <li>Respecter les lois et réglementations locales</li>
                            </ul>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                6. Limitation de responsabilité
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Résidence Cedo ne peut être tenue responsable des dommages indirects, accessoires ou
                                consécutifs résultant de l&apos;utilisation de nos services. Notre responsabilité est limitée
                                au montant payé pour la réservation concernée. Nous recommandons fortement la souscription
                                d&apos;une assurance voyage personnelle.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                7. Force majeure
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Résidence Cedo ne sera pas responsable de l&apos;inexécution de ses obligations en cas de
                                force majeure, notamment en cas de catastrophe naturelle, épidémie, guerre, troubles civils,
                                grève, ou toute autre circonstance indépendante de notre volonté.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                8. Propriété intellectuelle
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Tous les contenus du site web (textes, images, logos, vidéos) sont la propriété de
                                Résidence Cedo ou utilisés sous licence. Toute reproduction, distribution ou utilisation
                                non autorisée est strictement interdite.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                9. Protection des données personnelles
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Le traitement de vos données personnelles est régi par notre
                                <Link href="/privacy" sx={{ ml: 1, color: theme.palette.primary.main }}>
                                    Politique de Confidentialité
                                </Link>
                                . En utilisant nos services, vous consentez à la collecte et au traitement de vos
                                données conformément à cette politique.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                10. Droit applicable et juridiction
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Ces conditions d&apos;utilisation sont régies par le droit sénégalais. Tout litige relatif à
                                l&apos;interprétation ou à l&apos;exécution de ces conditions sera soumis à la juridiction exclusive
                                des tribunaux de Dakar, Sénégal.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                11. Modifications des conditions
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Résidence Cedo se réserve le droit de modifier ces conditions d&apos;utilisation à tout moment.
                                Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
                                Votre utilisation continue du site après publication constitue votre acceptation des
                                conditions modifiées.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                12. Contact
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                                Pour toute question concernant ces conditions d&apos;utilisation, contactez-nous :
                            </Typography>
                            <Box sx={{ pl: 2 }}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Résidence Cedo</strong>
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Email :
                                    <Link href="mailto:contact@residencecedo.sn" sx={{ ml: 1, color: theme.palette.primary.main }}>
                                        contact@residencecedo.sn
                                    </Link>
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Téléphone : +221 78 492 94 39
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    WhatsApp :
                                    <Link href="https://wa.me/221784929439" target="_blank" sx={{ ml: 1, color: theme.palette.primary.main }}>
                                        +221 78 492 94 39
                                    </Link>
                                </Typography>
                                <Typography variant="body1">
                                    Adresse : Dakar, Sénégal
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
}
