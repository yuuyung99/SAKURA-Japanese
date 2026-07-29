// JavaScript source code
/*=====================================================
    TRACKING SYSTEM
=====================================================*/

window.dataLayer = window.dataLayer || [];


/*=====================================================
    TRACK EVENT
=====================================================*/

function trackEvent(eventName, data = {}) {

    window.dataLayer.push({

        event: eventName,

        ...data

    });

}


/*=====================================================
    FORM SUBMIT
=====================================================*/

function trackFormSubmit() {

    trackEvent('form_submit');

}


/*=====================================================
    CTA CLICK
=====================================================*/

function trackCTAClick(buttonName = '') {

    trackEvent('cta_click', {

        button_name: buttonName

    });

}

/*=====================================================
    PHONE CLICK
=====================================================*/

function trackPhoneClick() {

    trackEvent('phone_click');

}


/*=====================================================
    ZALO CLICK
=====================================================*/

function trackZaloClick() {

    trackEvent('zalo_click');

}