/* Количество аудио-узлов */
var nodesCount = 0;

var initAudioNodesCount = function () {
    nodesCount = 0;
};

/* Обработчик события OnScroll. Собственно здесь и происходит основная работа */
var onScrollEventHandler = function () {

    var nodes = $('.audio');
    if (nodes.length > 0) {
        nodesCount = nodes.length;
        addDownloadLinks(nodes);
    }
//    setTimeout(onScrollEventHandler, 1000);
};

/* Получить список всех аудио-узлов */
function getAudioNodes() {
    return document.getElementsByClassName('audio');
};

/* Получить ссылку на скачивание файла */
function getAudioLink(node) {
    var value = $('input[type=hidden]', node).val();

    if (value === undefined) {
        return;
    }

    var hrefArr = value.split(',');

    if (hrefArr.length > 1) {
        return hrefArr[0];
    }

};

/* Получить название аудиозаписи */
function getAudioName(node) {
    var info = node.getElementsByClassName('title_wrap')[0];
    var performer = getPerformer(info);
    var name = getTitle(info);
    var ext = 'mp3';	// may be changed
    return performer + ' - ' + name + '.' + ext;
};

/* Получить название исполнителя */
function getPerformer(node) {
    var children = node.childNodes;

    for (var i = 0; i < children.length; i++) {
        if (children[i].tagName == 'B') {
            var children1 = children[i].childNodes;

            for (var j = 0; j < children1.length; j++) {
                if (children1[j].tagName == 'A') {
                    return children1[j].innerText;
                }
            }
        }
    }

    return 'Unknown artist';
}

/* Получить название песни */
function getTitle(node) {
    var titleElement = node.getElementsByClassName('title')[0];
    return titleElement.innerText;
}

/* Добавить ссылку для загрузки в аудио-узел */
function addDownloadLink(node) {

    var link = getAudioLink(node)

    if (link === undefined) {
        return;
    }


//    var a = document.createElement('a');
//    a.href = window.URL.createObjectURL(file.getBlob('text/plain'));
//    a.download = link; // set the file name
////    a.style.display = 'none';
//    document.body.appendChild(a);
//    a.click(); //this is proba

//    var onclick = ""
    var download_action = '<div class="audio_remove_wrap vokal_el fl_r"><div class="vokal_download_btn" href="' + link + '" class="audio_remove" style="background-position: -135px -51px;"></a></div>';
    $('.actions', node).prepend(download_action)

};

/* Добавить ссылку для загрузки в список узлов */
function addDownloadLinks(nodes) {


//    addDownloadLink(nodes[3]);
//
    for (var i = 0; i < nodes.length; i++) {
        addDownloadLink(nodes[i]);

        //correctOnClick(nodes[i]);
    }
};

/* Создать элемент для загрузки файла */
function createDownloadElement(node) {
    var e = document.createElement('a');
    e.setAttribute('href', getAudioLink(node));
    e.setAttribute('download', getAudioName(node));
    e.setAttribute('id', 'audioDownloadLink');
    e.setAttribute('onclick', 'window.open(\"' + getAudioLink(node) + '\"); cur.cancelClick = true; return false;');
    //e.setAttribute('style', 'position:absolute; margin-left:430px; margin-top:-15px');

    var info = node.getElementsByClassName('title_wrap')[0];
    e.innerHTML = getTitle(info);

    return e;
};

/* Проверить, имеется ли уже  */
function checkDownloadLink(node) {
    var children = node.childNodes;
    for (var i = 0; i < children.length; i++) {
        if (children[i].tagName == undefined || children[i].id == undefined)
            continue;
        if (children[i].tagName == 'A' && children[i].id == 'audioDownloadLink')
            return true;
    }
    return false;
};

/* Перенаправить событие onclick плейера на кнопку  */
function correctOnClick(node) {
    var area = node.getElementsByClassName('area')[0];
    var playbtn = node.getElementsByClassName('play_btn')[0];
    var jsCode = area.getAttribute('onclick');
    playbtn.setAttribute('onclick', jsCode);
    area.setAttribute('onclick', '');
}


/* Инициализация */

function initialize() {


    var page_wrap = $('#page_wrap')
    onScrollEventHandler();

    $('#page_wrap').on('mouseup', initAudioNodesCount)
    $('.vokal_el').on('click', function(e){
        var url ="https://psv4.vk.me/c4634/u8730304/audios/30c037597a3d.mp3";
//        alert(url);
        if (url == undefined) return;
        chrome.extension.sendMessage({cmd: "audio_download", url: url});
        alert(url);
        return false;
    })
};


Zepto(function ($) {
    initialize();
})
