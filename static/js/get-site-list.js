import {createNode, appendTag, getElement, getElements, removeAllNode} from './common.js';
import { makeBottomToolbar } from './bottom-toolbar.js';
import { apiURL } from './api-url.js';

const root          = document.getElementById("root")
const url           = window.location.pathname.split('/');
const apiUrlKey     = url.filter((element) => element != "").pop();

function renderItem(post) {
    /* 각 item의 tag를 rendering 하는 함수 */

    const article               = createNode('article')
    article.className           = 'c18o9ext grid hiddenActions noExcerpt'
    article.onclick             = selectBulkIcon
    appendTag(root, article)

    const selectedBack          = createNode('div')
    selectedBack.className      = 'selectedBack'
    appendTag(article, selectedBack)

    const item                  = createNode('div')
    item.className              = 'cardWrap'
    appendTag(article, item)

    const imgContainer          = createNode('div')
    imgContainer.className      = 'c97c5c media'
    appendTag(item, imgContainer)

    const itemLink              = createNode('a')
    itemLink.href               = post.thumbnail_url
    appendTag(imgContainer, itemLink)

    const img                   = createNode('img')
    img.src                     = post.thumbnail_url
    img.style                   = '--fallbackBackground:#1CB0A880; --fallbackColor:#1CB0A8; --fallbackLetter:&quot;T&quot;;">'
    appendTag(itemLink, img)

    const content               = createNode('div')
    content.className           = 'content'
    appendTag(item, content)

    const titleContainer        = createNode('h2')
    titleContainer.className    = 'title'
    appendTag(content, titleContainer)

    const title                 = createNode('a')
    title.innerText             = post.title
    appendTag(titleContainer, title)

    const details               = createNode('cite')
    details.className           = 'details'
    appendTag(content, details)

    const publisher             = createNode('a')
    publisher.className         = 'publisher'
    publisher.href              = post.url == null ? '#' : post.url
    publisher.innerText         = post.host_name
    publisher.setAttribute('target', post.url == null ? '' : '_blank')
    appendTag(details, publisher)

    // 각 항목(item)의 하단 툴바
    makeBottomToolbar(article, post)
   
}

function selectBulkIcon(){
    /* bulk toolbar 활성화 시 사이트 항목 선택 이벤트  */

    const headerToolbar = getElement('.n27eiag')

    if (headerToolbar.classList.contains('bulk')) {
        this.classList.toggle('selected')
    
        let choiceIcon = this.querySelector('.select-dot-choice')
        choiceIcon.classList.toggle('off')
        
        // 선택 벌크 카운팅
        countSelectedBuik()
    }
}

function countSelectedBuik(){
    const selected_articles = []
    const articles = getElements('.c18o9ext')

    articles.forEach(element => {
        if(element.classList.contains('selected')){
            selected_articles.push(element)
        }
    })

    const selectedSite = getElement('.selected-site')
    selectedSite.textContent = selected_articles.length == 0 ? '항목선택' : `${selected_articles.length}개 항목`
}

function mapPosts(data) {
    /* 각 데이터를 renderPost에 전달하여 rendering하는 함수 */

    // root 모든 요소 초기화
    removeAllNode(root)

    return data.map(item => {
        renderItem(item);
    })
}

function makeActive() {
    /* side bar의 각 탭을 클릭 시, 활성화하는 함수 */
    
    let i; 
    const sidebar       = document.querySelectorAll('.sv813dg')
    const url           = window.location.pathname.split('/');
    const idName        = url.filter((element) => element != "").pop();
    const tabName       = document.getElementById(idName);
    const pageTitle     = getElement('.pageTitle');
    const tabTitle      =   {
                            'mylist' : '내 목록',
                            'categories' : '카테고리',
                            'favorites' : '즐겨찾기',
                            'highlights' : '하이라이트',
                            'articles' : '아티클',
                            'videos' : '동영상',
                            }
    
    // side bar의 각 탭 비활성화
    for (i = 0; i < sidebar.length; i++) {  
      sidebar[i].classList.remove('active');
    }
    
    // 선택한 태그만 활성화
    tabName.classList.add('active')

     // main header 의 title 바꾸기
     pageTitle.innerText = `${tabTitle[apiUrlKey]}`
   
  }

function getSiteList(word='') {
    /* 각 탭에 해당되는 모든 항목들을 조회하여 함수 */
    
    // 선택한 탭 활성화하기  
    makeActive()

    // 해당되는 항목들 조회하기  
    fetch(`${apiURL[apiUrlKey]}?word=${word}`)
        .then(response => response.json())
        .then(data => {
            mapPosts(data)
        })
        .catch(err => {
            console.log(err);
        })
}

getSiteList()

export {
    getSiteList
};