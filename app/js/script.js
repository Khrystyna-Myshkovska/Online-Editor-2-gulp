$(function () {

    // Доступ до баттонів ,які будуть стилізувати текст

    const boldText = $('.boldText');
    const iText = $('.italicText');
    const uText = $('.underlineText');
    const sText = $('.linethText');
    const classAdd = cAdd => $('div.areaForText').toggleClass(cAdd);

    boldText.click(() => {
        classAdd('fontW');
    })
    iText.click(() => {
        classAdd('fontI');
    })
    uText.click(() => {
        classAdd('fontU');
    })
    sText.click(() => {
        classAdd('fontS');
    });

    // Доступ до баттонів ,які будуть вирівнювати текст
    const textLeft = $('.textLeft');
    const textCenter = $('.textCenter');
    const textRight = $('.textRight');
    textLeft.click(() => {
        $('div.areaForText').css('textAlign', 'left');

    });
    textCenter.click(() => {
        $('div.areaForText').css('textAlign', 'center');

    });
    textRight.click(() => {
        $('div.areaForText').css('textAlign', 'right');

    })

    // Dropdown menu,яке відповідає за те, щоб змінити стиль тексту

    $('a[value="fontFamily"]>span').each(function () {
        $(this).click(() => {
            const styleFamily = ($(this).css("fontFamily"));
            $('div.areaForText').css('fontFamily', styleFamily);
            $('div.areaForText>p').css('fontFamily', styleFamily);
        })
    });

    // Dropdown menu,яке відповідає за Font-size

    $('a[value="fontSize"]>span').each(function () {
        $(this).click(() => {
            const styleSize = ($(this).css("fontSize"));
            $('div.areaForText>p').css('fontSize', styleSize);
        })
    });
    const bgBtn = $('.bgBtn');
    const imageBtn = $('.imgBtn');
    const fileBtn = $('.fileBtn');

    function removeClassModal() {
        $('.nav-link').removeClass('active');
    }

    // Зміна кольору тексту

    $('.smallBox').each(function () {
        $(this).click(() => {
            const styleColor = ($(this).css("backgroundColor"));
            $('div.areaForText').css('color', styleColor);
            $('div.areaForText>p').css('color', styleColor);
        })
    })
    //Зміна фону на колір

    $('.smallBox2').each(function () {
        $(this).click(() => {
            // $('.areaForText').removeAttr('style')
            const styleBg = ($(this).css("backgroundColor"));
            $('.areaForText').css('backgroundColor', styleBg);
        })
    })

    bgBtn.click(() => {
        removeClassModal();
        bgBtn.addClass('active');
        $('.boxColorDisplay2').removeClass('displayNone');
        $('.bgStyle').addClass('displayNone');
        $('.getFile').addClass('displayNone');
    });

    //Зміна фону на картинку
    imageBtn.click(() => {
        removeClassModal();
        imageBtn.addClass('active');
        $('.bgStyle').removeClass('displayNone');
        $('.boxColorDisplay2').addClass('displayNone');
        $('.getFile').addClass('displayNone');

        $('.bgImage').each(function () {
            $(this).click(() => {
                const imgBg = ($(this).css("backgroundImage"));
                $('.areaForText').css({
                    backgroundImage: imgBg,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                });
            });
        });
    });

    // При кліку на File в модальному вікні , з'являється можливість вибрати файл з девайсу на фон тла
    fileBtn.click(() => {
        removeClassModal();
        fileBtn.addClass('active');
        $('.boxColorDisplay2').addClass('displayNone');
        $('.bgStyle').addClass('displayNone');
        $('.getFile').removeClass('displayNone');
        $('.areaForText').css({
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
        });
    });

})
const getSel = sel => document.querySelector(sel)
//Змінюємо фон шляхом вибору файлу з девайсу
const getFile = document.querySelector('.form-control-file');
getFile.onchange = function (event) {
    let container = document.querySelector('.areaForText')
    let url = URL.createObjectURL(event.target.files[0]);
    container.style.backgroundImage = `url(${url})`;
}


// Баттон ,який відповідає за форму Sign In 

const submitLockBtn = getSel('.btnSubmit');
const passwordLock = getSel('.passwordLock');
const loginLock = getSel('.loginLock');

//  Функція, яка відповідає за перевірку форми , чи поле не є пустим,
// або чи відповідає логін пароль == "admin"
// якщо перевірка проходить, тоді кнопка редагування тексту стає enabled та 
// кнопка зі значком lock стає unlocked
submitLockBtn.onclick = function () {
    submitLockBtn.removeAttribute('data-dismiss');
    if (loginLock.value == '' || passwordLock.value == '') {
        loginLock.style.border = '1px solid red';
        passwordLock.style.border = '1px solid red';
        getSel('.loginHelpValue').classList.remove('displayNone');
        getSel('.loginHelpWrong').classList.add('displayNone');

    } else if (loginLock.value !== 'admin' || passwordLock.value !== 'admin') {
        getSel('.loginHelpValue').classList.add('displayNone');
        getSel('.loginHelpWrong').classList.remove('displayNone');
    } else {
        loginLock.style.border = '';
        passwordLock.style.border = '';
        getSel('.loginHelpValue').classList.add('displayNone');
        getSel('.loginHelpWrong').classList.add('displayNone');
        submitLockBtn.setAttribute('data-dismiss', 'modal');
        getSel('.viewMore').disabled = false;
        getSel('.lockOnChange').src = 'images/icons/unlocked.png';
        getSel('.lockOnChange').style.width = '25px';
        getSel('.lockOnChange').style.height = '25px'
        loginLock.value = '';
        passwordLock.value = '';
    }
}

// Коли ми вже залогінились , можемо натиснути кнопку, яка відповідає за редагування тексту,
// .viewMore стала enabled, тому innerHtml передаємо в textarea
const changeText = getSel('.viewMore');
changeText.onclick = function () {
    getSel('nav').style.display = 'none';
    getSel('.secondaryButtons').style.display = 'block';
    getSel('.textarea').value = getSel('.areaForText').innerHTML;
    getSel('.myTextArea').style.display = 'block';
    getSel('.areaForText').style.display = 'none'

}

// кнопкт , які відповідають за збереження відформатованого тексту,
// створеної таблиці, списку ol/ul
const saveBtn = getSel('.saveBtn');
const tableBtn = getSel('.tableBtn');
const olBtn = getSel('.olBtn');
const ulBtn = getSel('.ulBtn');

//Зміна текстового наповнення в головному вікні при натисканні кнопки saveBtn
saveBtn.onclick = function () {
    getSel('nav').style.display = 'block';
    getSel('.secondaryButtons').style.display = 'none';
    getSel('.myTextArea').style.display = 'none';
    getSel('.areaForText').style.display = 'block'
    getSel('.areaForText').innerHTML = getSel('.textarea').value;
}

//Cтворення таблиці
const countTr = getSel('.countTr');
const countTd = getSel('.countTd');
const widthTd = getSel('.widthTd');
const heightTd = getSel('.heightTd');
const borderWidth = getSel('.borderWidth');
const borderType = getSel('.borderType');
const borderColor = getSel('.borderColor');

const resetTableBtn = getSel('.resetTable');
const createTableBtn = getSel('.createTable');
const tableForm = document.forms['tableForm'];
createTableBtn.onclick = function () {
    const tr = countTr.value;
    const td = countTd.value;
    const tdW = widthTd.value;
    const tdH = heightTd.value;
    const brdW = borderWidth.value;
    const brdT = borderType.value;
    const brdC = borderColor.value;


    //Для текстових полів
    function border(sel, count) {
        if (sel !== '' && !isNaN(sel)) {
            count.style.border = ''
        } else {
            count.style.border = '1px solid red';
            getSel('.valueWrong').classList.remove('displayNone');

        }
    }
    border(tr, countTr);
    border(td, countTd);
    border(tdW, widthTd);
    border(tdH, heightTd);
    border(brdW, borderWidth);

    //Для полів select
    if (brdT == 'choose style') {
        borderType.style.border = '1px solid red';
        getSel('.valueWrong').classList.remove('displayNone');
    } else {
        borderType.style.border = '';
    }
    if (brdC == 'choose color') {
        borderColor.style.border = '1px solid red'
    } else {
        borderColor.style.border = '';
        getSel('.valueWrong').classList.remove('displayNone');

    }

    //Якщо форми заповненні правильно = будуємо таблицю
    if (!isNaN(tr) && !isNaN(td) && !isNaN(tdW) && !isNaN(tdH) && !isNaN(brdW) && tr !== '' && td !== '' && tdW !== '' && tdH !== '' && brdW !== '' && brdT !== 'choose style' && brdC !== 'choose color') {
        getSel('.valueWrong').classList.add('displayNone');
        getSel('.textarea').value += `<table>`;
        for (let i = 1; i <= td; i++) {
            getSel('.textarea').value += `<tr>`;
            for (let j = 1; j <= tr; j++) {
                getSel('.textarea').value += `<td style= "width:${tdW}px; height:${tdH}px; border:${brdW}px ${brdT} ${brdC}; border-collapse:collapse; border-spacing: 0"> TD </td>`;
            }
            getSel('.textarea').value += `</tr>`;
        }
        getSel('.textarea').value += `</table>`;
    }
}

//При натиксканні на кнопку Reset = поля таблиці очищаються
resetTableBtn.onclick = function () {
    for (let i = 0; i < tableForm.length; i++) {
        tableForm.elements[i].style.border = ''
    }
    tableForm.reset();
    getSel('.valueWrong').classList.add('displayNone');
}

//Ol Ul
function listInp(sel, className) {
    if (sel.value !== '' && !isNaN(sel.value)) {
        sel.style.border = '';
    } else {
        sel.style.border = '1px solid red';
        getSel(className).classList.remove('displayNone');
    }
}

function listSel(sel, className) {
    if (sel.value !== 'choose type marks') {
        sel.style.border = '';
    } else {
        sel.style.border = '1px solid red';
        getSel(className).classList.remove('displayNone');
    }
}

function listLoop(typeLi) {
    let count = typeLi.value;
    for (let i = 1; i <= count; i++) {
        getSel('.textarea').value += `<li> item ${i} </li>`
    }
}

//Створення списку ol
const olCreateBtn = getSel('.createOl');
const olResetBtn = getSel('.resetOl');
const olInput = getSel('.countOl');
const olSelect = getSel('.olList');
olCreateBtn.onclick = function () {
    listInp(olInput, '.olWrong')
    listSel(olSelect, '.olWrong')
    if (!isNaN(olInput.value) && olSelect.value !== 'choose type marks' && olInput.value !== '') {
        getSel('.olWrong').classList.add('displayNone');
        let type = olSelect.value;
        getSel('.textarea').value += `<ol type = ${type}>`;
        listLoop(olInput);
        getSel('.textarea').value += `</ol>`;
    }
}
olResetBtn.onclick = function () {
    getSel('.olWrong').classList.add('displayNone');
    document.forms['ol'].reset()
    olInput.style.border = '';
    olSelect.style.border = '';

}

//Створення списку  Ul
const ulCreateBtn = getSel('.createUl');
const ulResetBtn = getSel('.resetUl');
const ulInput = getSel('.countUl');
const ulSelect = getSel('.ulList');
ulCreateBtn.onclick = function () {
    listInp(ulInput, '.ulWrong')
    listSel(ulSelect, '.ulWrong');
    if (!isNaN(ulInput.value) && ulSelect.value !== 'choose type marks' && ulInput.value !== '') {
        getSel('.ulWrong').classList.add('displayNone');
        let type = ulSelect.value;
        getSel('.textarea').value += `<ul type = ${type}>`;
        listLoop(ulInput);
        getSel('.textarea').value += `</ul>`;
    }
}
ulResetBtn.onclick = function () {
    getSel('.ulWrong').classList.add('displayNone');
    document.forms['ul'].reset()
    ulInput.style.border = '';
    ulSelect.style.border = '';
}