import {Alert, Snackbar} from "@mui/material";

export default function SnackbarAlert({alertStatus, setAlertStatus}) {
    const handleClose = () => {
        setAlertStatus({...alertStatus, open: false});
    };

    return (
        <Snackbar open={alertStatus.open} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={handleClose} severity={alertStatus.type} id={'snackbarAlert'} variant={'filled'}>
                {alertStatus.message}
            </Alert>
        </Snackbar>
    );
}