'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Stack,
    useTheme,
    Fade,
    Grow,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Help as HelpIcon,
} from '@mui/icons-material';
import { FAQ } from '../../types';

interface FAQSectionProps {
    faqs: FAQ[];
    title?: string;
    description?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
    faqs,
    title = "Questions fréquemment posées",
    description = "Trouvez les réponses aux questions les plus courantes"
}) => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const openAll = () => {
        // Pour Material-UI Accordion, on ne peut pas ouvrir tous en même temps par défaut
        // On ouvre le premier
        setExpanded('panel0');
    };

    const closeAll = () => {
        setExpanded(false);
    };

    if (faqs.length === 0) {
        return null;
    }

    return (
        <Box sx={{ py: 8, backgroundColor: 'white' }}>
            <Container maxWidth="lg">
                <Fade in timeout={1000}>
                    <Box textAlign="center" sx={{ mb: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 400,
                                mb: 2,
                                color: theme.palette.text.primary,
                            }}
                        >
                            ❓ {title}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                            {description}
                        </Typography>

                        {faqs.length > 1 && (
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Button
                                    variant="outlined"
                                    onClick={openAll}
                                    size="small"
                                    sx={{ borderRadius: 3 }}
                                >
                                    Voir le premier
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={closeAll}
                                    size="small"
                                    sx={{ borderRadius: 3 }}
                                >
                                    Tout fermer
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </Fade>

                <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                    {faqs.map((faq, index) => (
                        <Grow in timeout={1000 + index * 100} key={faq.id}>
                            <Accordion
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                                sx={{
                                    mb: 2,
                                    borderRadius: 3,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    border: '1px solid #e0e0e0',
                                    '&:before': {
                                        display: 'none',
                                    },
                                    '&.Mui-expanded': {
                                        margin: '0 0 16px 0',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                        borderColor: theme.palette.primary.main,
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}bh-content`}
                                    id={`panel${index}bh-header`}
                                    sx={{
                                        backgroundColor: expanded === `panel${index}` ? '#f8f9fa' : 'white',
                                        borderRadius: expanded === `panel${index}` ? '12px 12px 0 0' : '12px',
                                        '& .MuiAccordionSummary-content': {
                                            my: 2,
                                        },
                                        '&:hover': {
                                            backgroundColor: '#f8f9fa',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <HelpIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {faq.question}
                                        </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '0 0 12px 12px',
                                        pt: 0,
                                        pb: 3,
                                        px: 3,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            lineHeight: 1.7,
                                            color: theme.palette.text.secondary,
                                            pl: 4,
                                        }}
                                    >
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grow>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default FAQSection;