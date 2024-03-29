import { useEffect } from 'react';

const useSnap = () => {
  useEffect(() => {
    const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = 'SB-Mid-client-VbyepOAT5-2nZ9sJ';

    const script = document.createElement('script');
    script.src = snapScript;
    script.setAttribute('data-client-key', clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snapToken, embedId, action) => {
    window.snap.embed(snapToken, {
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
        action.onClose(result);
      },
    });
  };

  return { snapEmbed };
};

export { useSnap };
