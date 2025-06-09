// used to create basic form validation for the weather API form

export default function validation() {
    function checkOnlyWhitespace(inputVal) {
        const onlyWhitespaces = /^\s*$/;

        if (onlyWhitespaces.test(inputVal)) {
            return true;
        }

        return false;
    }

    function createLocationValidation(locationHTMLInput) {
        locationHTMLInput.addEventListener("input", () => {

            // if the input given is only whitespaces, error. If not, clear validation
            if (checkOnlyWhitespace(locationHTMLInput.value)) {
                locationHTMLInput.setCustomValidity(
                    "Please enter a non-whitespace location",
                );
            } else {
                locationHTMLInput.setCustomValidity("");
            }
            // after marking validity, report current validity
            locationHTMLInput.reportValidity();

        });
    }

    return { createLocationValidation };
}
