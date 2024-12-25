import toast from 'react-hot-toast';

const successToast = (message, toastId) => toast.success(message, {id: toastId,});
const failureToast = (message, toastId) => toast.error(message, {id: toastId,});
const WaitingToast = (message) => toast.loading(message);

const notify = (message, icon) => toast(message, {
    duration: 3000,
    position: 'top-center',

    // Styling
    style: {},
    className: '',

    // Custom Icon
    icon,

    // Change colors of success/error/loading icon
    iconTheme: {
        primary: '#000',
        secondary: '#fff',
    },

    // Aria
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    },
});

const toastTemplate = {
    successToast,
    failureToast,
    WaitingToast,
    notify
}

export default toastTemplate