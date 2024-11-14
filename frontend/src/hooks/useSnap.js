import { useEffect, useState } from 'react';

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const script = document.createElement('script');
    script.src = snapScript;
    const clientKey = 'SB-Mid-client-VbyepOAT5-2nZ9sJ';
    script.setAttribute('data-client-key', clientKey);
    script.onload = () => {
      setSnap(window.snap)
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snapToken, embedId, action) => {

    if (snap) {
      snap.embed(snapToken, {
        embedId,
        onSuccess: function (result) {
          /* You may add your own implementation here */
          alert('payment success!');
          console.log(result);
          action.onSuccess(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert('wating your payment!');
          console.log(result);
          action.onPending(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert('payment failed!');
          console.log(result);
          action.onError(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert('you closed the popup without finishing the payment');
          action.onClose();
        },
      });
    }
  };

  return { snapEmbed };
};

export default useSnap;