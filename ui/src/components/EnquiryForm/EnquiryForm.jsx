import { useState } from "react";
import styles from "./EnquiryForm.module.css";
import { submitEnquiry } from "../../services/enquiryService";

const initialValues = {
  name: "",
  email: "",
  clinicName: "",
  message: "",
  website: "",
};

function EnquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function validate() {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    } else if (values.name.trim().length > 100) {
      nextErrors.name = "Your name must be 100 characters or fewer.";
    }

    const email = values.email.trim();

    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (values.clinicName.trim().length > 150) {
      nextErrors.clinicName =
        "Clinic or organization name must be 150 characters or fewer.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Please tell us how we can help.";
    } else if (values.message.trim().length > 3000) {
      nextErrors.message = "Your message must be 3000 characters or fewer.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    setStatus("idle");
    setStatusMessage("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      const result = await submitEnquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        clinicName: values.clinicName.trim(),
        message: values.message.trim(),
        website: values.website,
      });

      setStatus("success");
      setStatusMessage(
        result.message ||
          "Thank you! Your enquiry has been submitted successfully.",
      );
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      if (error?.response?.status === 429) {
        setStatus("error");
        setStatusMessage(
          "You've sent several enquiries in a short time. Please wait a minute before trying again.",
        );
        return;
      }

      setStatus("error");
      setStatusMessage(
        error?.response?.data?.message &&
          typeof error.response.data.message === "string"
          ? error.response.data.message
          : "We couldn't submit your enquiry right now. Please try again shortly.",
      );
    }
  }

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="enquiry-title"
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Let's connect</p>

          <h2 id="enquiry-title" className={styles.title}>
            Interested in SamaRoot?
          </h2>

          <p className={styles.description}>
            Tell us a little about your clinic and what you're looking for. We'd
            love to hear from you.
          </p>

          <div className={styles.contactNote}>
            <span className={styles.noteIcon} aria-hidden="true">
              @
            </span>
            <div>
              <strong>Have a question?</strong>
              <p>Send us an enquiry using the form.</p>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="enquiry-website">Leave this field empty</label>
              <input
                id="enquiry-website"
                name="website"
                type="text"
                value={values.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="enquiry-name">Your name *</label>
              <input
                id="enquiry-name"
                name="name"
                autoComplete="name"
                maxLength={100}
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "enquiry-name-error" : undefined
                }
                placeholder="Enter your name"
                required
              />
              {errors.name && (
                <p id="enquiry-name-error" className={styles.error}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="enquiry-email">Work email *</label>
              <input
                id="enquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "enquiry-email-error" : undefined
                }
                placeholder="you@yourclinic.com"
                required
              />
              {errors.email && (
                <p id="enquiry-email-error" className={styles.error}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="enquiry-clinic">Clinic or organization</label>
              <input
                id="enquiry-clinic"
                name="clinicName"
                autoComplete="organization"
                maxLength={150}
                value={values.clinicName}
                onChange={handleChange}
                aria-invalid={Boolean(errors.clinicName)}
                aria-describedby={
                  errors.clinicName ? "enquiry-clinic-error" : undefined
                }
                placeholder="Your clinic name"
              />
              {errors.clinicName && (
                <p id="enquiry-clinic-error" className={styles.error}>
                  {errors.clinicName}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="enquiry-message">Your message *</label>
              <textarea
                id="enquiry-message"
                name="message"
                rows="4"
                maxLength={3000}
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "enquiry-message-error" : undefined
                }
                placeholder="Tell us about your requirements..."
                required
              />
              {errors.message && (
                <p id="enquiry-message-error" className={styles.error}>
                  {errors.message}
                </p>
              )}
            </div>

            <button
              className={styles.submitButton}
              type="submit"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : "Send enquiry"}
              {status !== "submitting" && <span aria-hidden="true"> →</span>}
            </button>

            {statusMessage && (
              <p className={styles.notice} role="status" aria-live="polite">
                {statusMessage}
              </p>
            )}

            <p className={styles.privacyNote}>
              Please do not include patient medical information or other
              sensitive health details.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EnquiryForm;
