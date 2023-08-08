import React, { useEffect, useRef } from "react";

const XFrameBypass = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    const load = (url, options) => {
      if (!url || !url.startsWith("http")) {
        throw new Error(
          `X-Frame-Bypass src ${url} does not start with http(s)://`
        );
      }

      iframe.srcdoc = `<html>
        <head>
          <style>
            .loader {
              position: absolute;
              top: calc(50% - 25px);
              left: calc(50% - 25px);
              width: 50px;
              height: 50px;
              background-color: #333;
              border-radius: 50%;
              animation: loader 1s infinite ease-in-out;
            }
            @keyframes loader {
              0% {
                transform: scale(0);
              }
              100% {
                transform: scale(1);
                opacity: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="loader"></div>
        </body>
      </html>`;

      fetchProxy(url, options, 0)
        .then((res) => res.text())
        .then((data) => {
          if (data) {
            iframe.srcdoc = data.replace(
              /<head([^>]*)>/i,
              `<head$1>
                <base href="${url}">
                <script>
                  // X-Frame-Bypass navigation event handlers
                  document.addEventListener('click', e => {
                    if (frameElement && document.activeElement && document.activeElement.href) {
                      e.preventDefault();
                      frameElement.load(document.activeElement.href);
                    }
                  });
                  document.addEventListener('submit', e => {
                    if (frameElement && document.activeElement && document.activeElement.form && document.activeElement.form.action) {
                      e.preventDefault();
                      if (document.activeElement.form.method === 'post')
                        frameElement.load(document.activeElement.form.action, { method: 'post', body: new FormData(document.activeElement.form) });
                      else
                        frameElement.load(document.activeElement.form.action + '?' + new URLSearchParams(new FormData(document.activeElement.form)));
                    }
                  });
                </script>`
            );
          }
        })
        .catch((e) => console.error("Cannot load X-Frame-Bypass:", e));
    };

    const fetchProxy = (url, options, i) => {
      const proxy = [
        "https://cors.io/?",
        "https://jsonp.afeld.me/?url=",
        "https://cors-anywhere.herokuapp.com/",
      ];

      return fetch(proxy[i] + url, options)
        .then((res) => {
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          return res;
        })
        .catch((error) => {
          if (i === proxy.length - 1) throw error;
          return fetchProxy(url, options, i + 1);
        });
    };

    iframe.load = load;
    iframe.load("https://qleap.erajaya.com/app/event?source=react");

    return () => {
      iframe.load = null;
    };
  }, []);

  return (
    // <iframe
    //   ref={iframeRef}
    //   sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
    // />
    <iframe
      ref={iframeRef}
      sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-top-navigation-by-user-activation"
    />
  );
};

export default XFrameBypass;
