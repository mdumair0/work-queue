import toast from 'react-hot-toast';

const successToast = (toastId) => toast.success('Server is up!', {id: toastId,});
const failureToast = (toastId) => toast.error("Server failed to load 😓", {id: toastId,});
const WaitingToast = () => toast.loading('Server is spinning up');

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