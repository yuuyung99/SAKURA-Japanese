/* =====================================================
   CONTACT POPUP + CONTACT FORM
===================================================== */

document.addEventListener(

    'DOMContentLoaded',

    function () {


        /* =====================================================
           ELEMENTS
        ===================================================== */

        const contactPopup =
            document.getElementById(
                'contactPopup'
            );


        const contactForm =
            document.getElementById(
                'contactForm'
            );


        const contactName =
            document.getElementById(
                'contactName'
            );


        const contactPhone =
            document.getElementById(
                'contactPhone'
            );


        const contactGoal =
            document.getElementById(
                'contactGoal'
            );


        const popupOpenButtons =
            document.querySelectorAll(
                '.open-contact-popup'
            );


        const popupCloseButtons =
            document.querySelectorAll(
                '[data-popup-close]'
            );
        const successPopup =
            document.getElementById(
                'successPopup'
            );


        const successCloseButtons =
            document.querySelectorAll(
                '[data-success-close]'
            );

        /* =====================================================
           GOOGLE APPS SCRIPT URL
        ===================================================== */

        const GOOGLE_SCRIPT_URL =

            'https://script.google.com/macros/s/AKfycbw7-Cr4kJyNHsugaGL2BoS4KLB0RqiLhlxZfDzNtSPczz2zvrDD7FVRfsjo7lAt9KGdvw/exec';


        /* =====================================================
           KIỂM TRA POPUP
        ===================================================== */

        if (!contactPopup) {

            return;

        }


        /* =====================================================
           MỞ POPUP
        ===================================================== */

        function openContactPopup() {


            contactPopup.classList.add(

                'active'

            );


            contactPopup.setAttribute(

                'aria-hidden',

                'false'

            );


            document.body.classList.add(

                'popup-open'

            );


            setTimeout(

                function () {


                    if (contactName) {

                        contactName.focus();

                    }


                },

                350

            );

        }


        /* =====================================================
           ĐÓNG POPUP
        ===================================================== */

        function closeContactPopup() {


            contactPopup.classList.remove(

                'active'

            );


            contactPopup.setAttribute(

                'aria-hidden',

                'true'

            );


            document.body.classList.remove(

                'popup-open'

            );

        }

        /* =====================================================
   SUCCESS POPUP
===================================================== */

        function openSuccessPopup() {

            if (!successPopup) {

                return;

            }


            successPopup.classList.add(

                'active'

            );


            successPopup.setAttribute(

                'aria-hidden',

                'false'

            );

        }


        function closeSuccessPopup() {

            if (!successPopup) {

                return;

            }


            successPopup.classList.remove(

                'active'

            );


            successPopup.setAttribute(

                'aria-hidden',

                'true'

            );

        }


        successCloseButtons.forEach(

            function (button) {


                button.addEventListener(

                    'click',

                    function () {


                        closeSuccessPopup();


                    }

                );


            }

        );
        /* =====================================================
           CÁC NÚT MỞ POPUP
        ===================================================== */

        popupOpenButtons.forEach(

            function (button) {


                button.addEventListener(

                    'click',

                    function (event) {


                        event.preventDefault();


                        openContactPopup();


                    }

                );

            }

        );


        /* =====================================================
           CÁC NÚT ĐÓNG POPUP
        ===================================================== */

        popupCloseButtons.forEach(

            function (button) {


                button.addEventListener(

                    'click',

                    function () {


                        closeContactPopup();


                    }

                );

            }

        );


        /* =====================================================
           ESC ĐỂ ĐÓNG POPUP
        ===================================================== */
        document.addEventListener(

            'keydown',

            function (event) {


                if (

                    event.key !== 'Escape'

                ) {

                    return;

                }


                if (

                    successPopup &&

                    successPopup.classList.contains(

                        'active'

                    )

                ) {


                    closeSuccessPopup();


                    return;

                }


                if (

                    contactPopup.classList.contains(

                        'active'

                    )

                ) {


                    closeContactPopup();

                }


            }

        );


        /* =====================================================
           CHỈ CHO PHÉP NHẬP SỐ ĐIỆN THOẠI
        ===================================================== */

        if (contactPhone) {


            contactPhone.addEventListener(

                'input',

                function () {


                    /*

                     * XÓA TẤT CẢ KÝ TỰ

                     * KHÔNG PHẢI SỐ

                     */

                    this.value =

                        this.value.replace(

                            /\D/g,

                            ''

                        );


                    /*

                     * GIỚI HẠN TỐI ĐA 10 SỐ

                     */

                    if (

                        this.value.length > 10

                    ) {


                        this.value =

                            this.value.slice(

                                0,

                                10

                            );

                    }


                }

            );


            /*

             * CHẶN KÝ TỰ KHÔNG PHẢI SỐ

             * NGAY TỪ BÀN PHÍM

             */

            contactPhone.addEventListener(

                'keydown',

                function (event) {


                    const allowedKeys = [

                        'Backspace',

                        'Delete',

                        'ArrowLeft',

                        'ArrowRight',

                        'ArrowUp',

                        'ArrowDown',

                        'Tab',

                        'Home',

                        'End'

                    ];


                    if (

                        allowedKeys.includes(

                            event.key

                        )

                    ) {


                        return;

                    }


                    if (

                        !/^[0-9]$/.test(

                            event.key

                        )

                    ) {


                        event.preventDefault();

                    }


                }

            );

        }


        /* =====================================================
           KIỂM TRA SỐ ĐIỆN THOẠI
        ===================================================== */

        function validatePhone(

            phone

        ) {


            /*

             * PHẢI ĐÚNG 10 CHỮ SỐ

             * VÀ BẮT ĐẦU BẰNG 0

             */

            const phoneRegex =

                /^0[0-9]{9}$/;


            return phoneRegex.test(

                phone

            );

        }


        /* =====================================================
           SUBMIT FORM
        ===================================================== */

        if (contactForm) {


            contactForm.addEventListener(

                'submit',

                async function (event) {


                    event.preventDefault();


                    /* =========================
                       LẤY DỮ LIỆU
                    ========================== */

                    const name =

                        contactName.value.trim();


                    const phone =

                        contactPhone.value.trim();


                    const goal =

                        contactGoal.value;


                    const submitButton =

                        contactForm.querySelector(

                            '.contact-form-submit'

                        );


                    const submitText =

                        submitButton.querySelector(

                            '.submit-text'

                        );


                    const submitLoading =

                        submitButton.querySelector(

                            '.submit-loading'

                        );


                    const submitArrow =

                        submitButton.querySelector(

                            '.submit-arrow'

                        );


                    /* =========================
                       VALIDATE HỌ TÊN
                    ========================== */

                    if (

                        name.length < 2

                    ) {


                        alert(

                            'Vui lòng nhập họ và tên.'

                        );


                        contactName.focus();


                        return;

                    }


                    /* =========================
                       VALIDATE SỐ ĐIỆN THOẠI
                    ========================== */

                    if (

                        !validatePhone(

                            phone

                        )

                    ) {


                        alert(

                            'Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng số 0.'

                        );


                        contactPhone.focus();


                        return;

                    }


                    /* =========================
                       VALIDATE MỤC TIÊU
                    ========================== */

                    if (

                        !goal

                    ) {


                        alert(

                            'Vui lòng chọn mục tiêu học tiếng Nhật.'

                        );


                        contactGoal.focus();


                        return;

                    }


                    /* =========================
                       TRẠNG THÁI ĐANG GỬI
                    ========================== */

                    submitButton.disabled = true;


                    submitText.style.display =

                        'none';


                    submitLoading.style.display =

                        'flex';


                    submitArrow.style.display =

                        'none';


                    /* =========================
                       DỮ LIỆU GỬI
                    ========================== */

                    const formData = {


                        name: name,


                        phone: phone,


                        goal: goal,


                        source:

                            'Hero - Đăng ký tư vấn'

                    };


                    try {


                        await fetch(

                            GOOGLE_SCRIPT_URL,

                            {

                                method:

                                    'POST',


                                mode:

                                    'no-cors',


                                headers: {

                                    'Content-Type':

                                        'text/plain;charset=utf-8'

                                },


                                body:

                                    JSON.stringify(

                                        formData

                                    )

                            }

                        );


                        /* =========================
                           THÀNH CÔNG
                        ========================== */

                       

                        contactForm.reset();


                        submitButton.disabled = false;


                        submitText.style.display =

                            '';


                        submitLoading.style.display =

                            'none';


                        submitArrow.style.display =

                            '';


                        closeContactPopup();


                        openSuccessPopup();


                    }


                    catch (error) {


                        console.error(

                            'Submit error:',

                            error

                        );


                        submitText.textContent =

                            'THỬ LẠI';


                        submitButton.disabled = false;


                        submitText.style.display =

                            '';


                        submitLoading.style.display =

                            'none';


                        submitArrow.style.display =

                            '';


                        alert(

                            'Có lỗi xảy ra. Vui lòng thử lại sau.'

                        );

                    }


                }

            );

        }


    }

);

/*=====================================================
    BACK TO TOP
=====================================================*/

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {

    if (window.scrollY > 300) {

        backToTop.classList.add('show');

    } else {

        backToTop.classList.remove('show');

    }

});

backToTop.addEventListener('click', () => {

    window.scrollTo({

        top: 0,

        behavior: 'smooth'

    });

});

/*=====================================================
    SCROLL REVEAL
=====================================================*/

const revealItems = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('active');

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealItems.forEach(item => {

    revealObserver.observe(item);

});

/*=====================================================
    DISABLE SCROLL RESTORATION
=====================================================*/

if ('scrollRestoration' in history) {

    history.scrollRestoration = 'manual';

}

window.addEventListener('load', () => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
    });

});







