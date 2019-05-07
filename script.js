//Использую прием "модуль", чтобы не засорять глобальную область видимости.
(function getMovesChessHorse () {
    //Значения координатных прямых
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const numbers = [1,2,3,4,5,6,7,8];

    //Вешаем на кнопку обработчик кликов
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        //Символы из поля ввода переводим в верхний регистр, превращаем в массив и проверяем перед обработкой
        let сoordArray = [ ...document.querySelector('input').value.toUpperCase() ];
        if( check(сoordArray) ) {
            //Есди все Ок, то отправляем на обработку
            result(сoordArray);
        };
    });

    function check(сoordArray) {
        //Проверяем, что введено 2 символа
        if (сoordArray.length !== 2) {
            alert('Не корректное количество символов. Введите букву и цыфру. Пример: D4.');
        //Проверяем, что првый символ - корректная буква (хотя бы один символ из массива букв должен совпасть с введенным)
        } else if (
            !letters.some(letter => {
                return сoordArray[0] === letter;
            })
        ) {
            alert('Первый символ не корректен. Введите одну из первых восьми букв латинского алфавита.');
        //Проверяем, что второй символ - корректная цифра
        } else if (
            !numbers.some(number => {
                return сoordArray[1] == number;
            })
        ) {
            alert('Второй символ не корректен. Введите цифру от 1 до 8.');
        //Если все ОК, то возвращаем true
        } else {
            return true;
        };
    };

    function result(сoordArray) {
        //Введенную букву превращаем в цифру в соответствии с позицией буквы на координатной прямой
        const x0 = letters.indexOf(сoordArray[0]) + 1;
        //Введенную цифру превращаем в цифру с типом number
            y0 = +сoordArray[1];

        //Вычисляем координаты 8 вариантов хода коня 
            x1 = x0-1;
            y1 = y0+2;

            x2 = x0+1;
            y2 = y0+2;

            x3 = x0+2;
            y3 = y0+1;

            x4 = x0+2;
            y4 = y0-1;

            x5 = x0+1;
            y5 = y0-2;

            x6 = x0-1;
            y6 = y0-2;

            x7 = x0-2;
            y7 = y0-1;

            x8 = x0-2;
            y8 = y0+1;

        const coordArray = [[x1, y1], [x2, y2], [x3, y3], [x4, y4], [x5, y5], [x6, y6], [x7, y7], [x8, y8]];

        //Создаем новый массив преобразуя пары координат "цифра, цифра" в "буква, цифра"
        const result = coordArray.map(couple => {
            //Берем только те координаты, где обе части больше 0 и меньше 9, т.е. находятся в пределах доски
            if (
                couple.every(coord => {
                    return coord > 0 && coord < 9;
                })
            ) {
                //Буква ищется по ее индексу в массиве
                const resultX = letters[couple[0] - 1];
                const resultY = couple[1];
                return ' ' + resultX + resultY;
            }
        });
        //Ощищаем получившийся массив от пустых значений
        const clearResult = result.filter(element => {
            return element != undefined;
        });
        alert('Возможные варианты исхода: ' + '\r\r' + clearResult);
    };
})();