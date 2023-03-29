$(document).ready(function () {
    $(".post_button").on("click", validate);

    function validateTitle(title) {
        var digitReg = /[0-9]/;
        var upperCaseRegEn = /[A-Z]/;
        var lowerCaseRegEn = /[a-z]/;
        var otherCaseReg = /[.,:.;@!#$%&'*+/=?^_`{|}~-]/;
        return title.length > 0
            && (digitReg.test(title) || lowerCaseRegEn.test(title)
                || upperCaseRegEn.test(title) || otherCaseReg.test(title));
    }

    function validateGenre(genre) {
        var upperCaseRegRu = /[А-Я]/;
        var lowerCaseRegRu = /[а-я]/;
        var regexLiteral1 = /к-поп/;
        var regexLiteral2 = /К-поп/;

        return genre.length > 0
            && (regexLiteral1.test(genre) || regexLiteral2.test(genre))
            && (upperCaseRegRu.test(genre) || lowerCaseRegRu.test(genre));
    }

    function validateYear(year) {
        return year.length > 0 && year.length < 5
            && year > 2007 && year < 2023;
    }

    function validateArtist(artist) {
        var upperCaseRegEng = /[A-Z]/;
        var lowerCaseRegEng = /[a-z]/;
        var space = /[ ]/;
        return artist.length > 0
            && upperCaseRegEng.test(artist)
            && lowerCaseRegEng.test(artist)
            || space.test(artist);
    }

    function sendForm() {
        $(".sending_result").text("Success!").fadeIn();

        fetch('/newalbum', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                "title": title.value,
                "artist": artist.value,
                "genre": genre.value,
                "year": year.value
            })
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            console.log('готово')
        })

    }

    function validate() {
        const title = $("#title").val();
        var $error_title = $(".error_title");
        var isNotValidate = false;
        if (!validateTitle(title)) {
            $error_title.text("* Введите название альбома").fadeIn();
            isNotValidate = true;
        }
        else {
            $error_title.text("");
        }

        const genre = $("#genre").val();
        var $error_genre = $(".error_genre");
        if (!validateGenre(genre)) {
            $error_genre.text("* Жанр должен быть указан на русском языке, слово к-поп обязательно").fadeIn();
            isNotValidate = true;
        }
        else {
            $error_genre.text("");
        }

        const year = $("#year").val();
        var $error_year = $(".error_year");
        if (!validateYear(year)) {
            $error_year.text("* Корректны значения от 2008 до 2022 включительно").fadeIn();
            isNotValidate = true;
        }
        else {
            $error_year.text("");
        }

        const artist = $("#artist").val();
        var $error_artist = $(".error_artist");
        if (!validateArtist(artist)) {
            $error_artist.text("* Участники указываются на английском языке").fadeIn();
            isNotValidate = true;
        }
        else {
            $error_artist.text("");
        }

        //console.log(title);
        //console.log(artist);
        //console.log(genre);
        //console.log(year);

        if (isNotValidate) {
            $(".sending_result").text(" * Валидация не пройдена. попробуйте ещё раз").fadeIn();
        }
        else {
            sendForm();
        }
        return false;
    }
});