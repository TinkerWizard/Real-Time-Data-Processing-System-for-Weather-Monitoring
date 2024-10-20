import { FormControl, TextField, FormHelperText, Button, Select, MenuItem, InputLabel, Stack } from "@mui/material";
import { useState } from "react";

export const Alert: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [threshold, setThreshold] = useState<string>(''); // For temperature input
    const [thresholdError, setThresholdError] = useState<string>('');
    const [condition, setCondition] = useState<string>('below'); // Default to 'below'
    const [city, setCity] = useState<string>('');

    // Handle email input
    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
        setEmailError('');
    };

    // Handle temperature threshold input
    const handleThresholdChange = (event: any) => {
        setThreshold(event.target.value);
        setThresholdError('');
    };

    // Handle condition change (above/below)
    const handleConditionChange = (event: any) => {
        setCondition(event.target.value);
    };

    const handleCityChange = (event: any) => {
        setCity(event.target.value);
    };

    // Handle form submission
    const handleAlertSignUpClick = async () => {
        let valid = true;
        
        console.log("--------------------",city);
        console.log("--------------------",threshold);
        console.log("--------------------",condition);
        console.log("--------------------",email);
        // Email validation
        if (email.length === 0) {
            setEmailError("Please enter your email");
            valid = false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email address");
            valid = false;
        }

        // Threshold validation
        if (threshold.length === 0) {
            setThresholdError("Please enter a temperature threshold");
            valid = false;
        } else if (isNaN(Number(threshold))) {
            setThresholdError("Threshold must be a number");
            valid = false;
        }

        // If valid, send data to backend
        if (valid) {
            try {
                const response = await fetch('http://localhost:3000/create-alert', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email, threshold, condition, city})
                });
                const data = await response.json();
                if(response.ok)
                {
                    alert(data.message);
                }
            } catch (error: any) {
                alert(`Error creating alert: ${error.response.data.error}`);
            }
        }
    };

    return (
        <Stack spacing={2}>
            {/* Email Input */}
            <FormControl>
                <TextField
                    label="Email"
                    variant="outlined"
                    onChange={handleEmailChange}
                    value={email}
                    error={Boolean(emailError)}
                />
                <FormHelperText className="text-danger">
                    {emailError}
                </FormHelperText>
            </FormControl>

            {/* Temperature Threshold Input */}
            <FormControl>
                <TextField
                    label="Temperature Threshold (°C)"
                    variant="outlined"
                    onChange={handleThresholdChange}
                    value={threshold}
                    error={Boolean(thresholdError)}
                    type="number"
                />
                <FormHelperText className="text-danger">
                    {thresholdError}
                </FormHelperText>
            </FormControl>

            {/* Condition Selector (Above/Below) */}
            <FormControl>
                <InputLabel id="condition-label">Condition</InputLabel>
                <Select
                    label="Condition"
                    value={condition}
                    onChange={handleConditionChange}
                >
                    <MenuItem value="below">Below</MenuItem>
                    <MenuItem value="above">Above</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="city-label">City</InputLabel>
                <Select
                    label="City"
                    value={city}
                    onChange={handleCityChange}
                >
                    <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                    <MenuItem value="Delhi">Delhi</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                    <MenuItem value="Chennai">Chennai</MenuItem>
                    <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                    <MenuItem value="Kolkata">Kolkata</MenuItem>
                </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
                variant="contained"
                onClick={handleAlertSignUpClick}
            >
                Sign Up for Alert
            </Button>
            <Button
                variant="outlined"
            >
                Cancel
            </Button>
        </Stack>
    );
}
