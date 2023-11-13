import {Alert, Snackbar} from "@mui/material";

export default function SnackbarAlert({alertStatus, setAlertStatus}) {
    const handleCloseAlert = (event) => {
        setAlertStatus({...alertStatus, open: false});
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertStatus({...alertStatus, open: false});
    };

    return (
        <Snackbar open={alertStatus.open} autoHideDuration={3000} onClose={handleClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={handleCloseAlert} severity={alertStatus.type} id={'snackbarAlert'} variant={'filled'}>
                {alertStatus.message}
            </Alert>
        </Snackbar>
    );
}