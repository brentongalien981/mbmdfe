import { toastr } from "react-redux-toastr";

export const showToastr = (data) => {

    const options = {
        timeOut: data.timeOut ? parseInt(data.timeOut) : 5000,
        showCloseButton: data.showCloseButton ?? true,
        progressBar: data.progressBar ?? true,
        position: data.position ?? "top-right"
    };

    const toastrInstance =
        data.notificationType === "info"
            ? toastr.info
            : data.notificationType === "warning"
                ? toastr.warning
                : data.notificationType === "error"
                    ? toastr.error
                    : toastr.success;

    toastrInstance(
        data.title ?? '',
        data.message,
        options
    );
};