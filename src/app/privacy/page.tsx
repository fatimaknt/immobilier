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
    Security as SecurityIcon,
} from '@mui/icons-material';

export default function PrivacyPage() {
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
                            <SecurityIcon
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
                                Politique de Confidentialité
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Résidence Cedo - Protection de vos données personnelles
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                            </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                1. Collecte des informations
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                                Résidence Cedo collecte les informations que vous nous fournissez directement lorsque vous :
                            </Typography>
                            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                                <li>Remplissez nos formulaires de contact ou de réservation</li>
                                <li>Créez un compte sur notre site web</li>
                                <li>Nous contactez par téléphone, email ou WhatsApp</li>
                                <li>Vous abonnez à notre newsletter</li>
                            </ul>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Les informations collectées peuvent inclure : nom, prénom, adresse email, numéro de téléphone,
                                adresse postale, préférences de logement ou de véhicule, et toute autre information que vous
                                choisissez de partager avec nous.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                2. Utilisation des informations
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                                Nous utilisons vos informations personnelles pour :
                            </Typography>
                            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                                <li>Traiter vos demandes de réservation d&apos;appartements et de véhicules</li>
                                <li>Vous contacter concernant nos services</li>
                                <li>Améliorer notre site web et nos services</li>
                                <li>Vous envoyer des informations marketing (avec votre consentement)</li>
                                <li>Respecter nos obligations légales</li>
                            </ul>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                3. Partage des informations
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                                Résidence Cedo ne vend, ne loue ni ne partage vos informations personnelles avec des tiers,
                                sauf dans les cas suivants :
                            </Typography>
                            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                                <li>Avec votre consentement explicite</li>
                                <li>Pour se conformer à une obligation légale</li>
                                <li>Avec nos prestataires de services (hébergement web, service de paiement)</li>
                                <li>En cas de vente ou fusion de notre entreprise</li>
                            </ul>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                4. Sécurité des données
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées pour
                                protéger vos informations personnelles contre la perte, l&apos;utilisation abusive, l&apos;accès non autorisé,
                                la divulgation, l&apos;altération ou la destruction. Cependant, aucune méthode de transmission sur
                                Internet ou de stockage électronique n&apos;est sécurisée à 100%.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                5. Vos droits
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                                Conformément à la réglementation en vigueur, vous disposez des droits suivants :
                            </Typography>
                            <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
                                <li>Droit d&apos;accès à vos données personnelles</li>
                                <li>Droit de rectification de vos données</li>
                                <li>Droit à l&apos;effacement de vos données</li>
                                <li>Droit à la limitation du traitement</li>
                                <li>Droit à la portabilité des données</li>
                                <li>Droit d&apos;opposition au traitement</li>
                            </ul>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Pour exercer ces droits, contactez-nous à l&apos;adresse :
                                <Link href="mailto:contact@residencecedo.sn" sx={{ ml: 1, color: theme.palette.primary.main }}>
                                    contact@residencecedo.sn
                                </Link>
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                6. Cookies
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont
                                de petits fichiers texte stockés sur votre appareil. Vous pouvez configurer votre navigateur
                                pour refuser les cookies, mais cela pourrait affecter certaines fonctionnalités du site.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                7. Conservation des données
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Nous conservons vos informations personnelles uniquement le temps nécessaire aux finalités
                                pour lesquelles elles ont été collectées, ou conformément aux obligations légales de conservation.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                8. Modifications de cette politique
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
                                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                                Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
                            </Typography>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
                                9. Contact
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
                                Pour toute question concernant cette politique de confidentialité, contactez-nous :
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
                                    Téléphone : +221 12 345 67 89
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    WhatsApp :
                                    <Link href="https://wa.me/221123456789" target="_blank" sx={{ ml: 1, color: theme.palette.primary.main }}>
                                        +221 12 345 67 89
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
