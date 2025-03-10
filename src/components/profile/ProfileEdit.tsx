import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // استخدام المحول المناسب
import { User, UserRole } from "../../types/user";

interface ProfileEditProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onSave: (values: Partial<User>) => Promise<void>;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string(),
  birthDate: Yup.date().nullable(),
  address: Yup.string(),
  specialization: Yup.string().when("role", {
    is: UserRole.TRAINER,
    then: Yup.string().required("Specialization is required"),
  }),
  experience: Yup.number().when("role", {
    is: UserRole.TRAINER,
    then: Yup.number()
      .min(0, "Invalid experience")
      .required("Experience is required"),
  }),
  goals: Yup.array().of(Yup.string().required("Goal cannot be empty")),
  medicalConditions: Yup.array().of(
    Yup.string().required("Condition cannot be empty")
  ),
});

const ProfileEdit: React.FC<ProfileEditProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      birthDate: user.birthDate || null,
      address: user.address || "",
      specialization: user.specialization || "",
      experience: user.experience || 0,
      certifications: user.certifications || [],
      goals: user.goals || [],
      medicalConditions: user.medicalConditions || [],
      preferredTrainingTime: user.preferredTrainingTime || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await onSave(values);
        onClose();
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    },
  });

  const handleDeleteGoal = (index: number) => {
    const newGoals = [...formik.values.goals];
    newGoals.splice(index, 1);
    formik.setFieldValue("goals", newGoals);
  };

  const handleDeleteCondition = (index: number) => {
    const newConditions = [...formik.values.medicalConditions];
    newConditions.splice(index, 1);
    formik.setFieldValue("medicalConditions", newConditions);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Birth Date"
                  value={formik.values.birthDate}
                  onChange={(date) => formik.setFieldValue("birthDate", date)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                multiline
                rows={2}
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid>

            {user.role === UserRole.TRAINER && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="specialization"
                    label="Specialization"
                    value={formik.values.specialization}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.specialization &&
                      Boolean(formik.errors.specialization)
                    }
                    helperText={
                      formik.touched.specialization &&
                      formik.errors.specialization
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    name="experience"
                    label="Years of Experience"
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.experience &&
                      Boolean(formik.errors.experience)
                    }
                    helperText={
                      formik.touched.experience && formik.errors.experience
                    }
                  />
                </Grid>
              </>
            )}

            {user.role === UserRole.TRAINEE && (
              <>
                <Grid item xs={12}>
                  <Box>
                    {formik.values.goals.map((goal, index) => (
                      <Chip
                        key={index}
                        label={goal}
                        onDelete={() => handleDeleteGoal(index)}
                        style={{ marginRight: "8px", marginBottom: "8px" }}
                      />
                    ))}
                  </Box>
                  <TextField
                    fullWidth
                    name="goals"
                    label="Goals"
                    value={formik.values.goals.join(", ")}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "goals",
                        e.target.value.split(",").map((g) => g.trim())
                      );
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    {formik.values.medicalConditions.map((condition, index) => (
                      <Chip
                        key={index}
                        label={condition}
                        onDelete={() => handleDeleteCondition(index)}
                        style={{ marginRight: "8px", marginBottom: "8px" }}
                      />
                    ))}
                  </Box>
                  <TextField
                    fullWidth
                    name="medicalConditions"
                    label="Medical Conditions"
                    value={formik.values.medicalConditions.join(", ")}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "medicalConditions",
                        e.target.value.split(",").map((m) => m.trim())
                      );
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Preferred Training Time</InputLabel>
                    <Select
                      name="preferredTrainingTime"
                      value={formik.values.preferredTrainingTime}
                      onChange={formik.handleChange}
                      label="Preferred Training Time"
                    >
                      <MenuItem value="morning">Morning</MenuItem>
                      <MenuItem value="afternoon">Afternoon</MenuItem>
                      <MenuItem value="evening">Evening</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileEdit;
