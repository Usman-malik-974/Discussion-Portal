let dataarray = [];
const submitques = document.getElementById("submit");
const newquesbtn = document.getElementById("newquestion");
const addresbtn = document.getElementById("addresponse");
const resolvebtn = document.getElementById("resolve");
const searchbar = document.getElementById("searchbar");
const list = document.getElementById("list");
const nomatchdiv=document.createElement("div");
nomatchdiv.innerHTML="No match found";
nomatchdiv.style["font-size"]="xx-large";
nomatchdiv.style["font-weight"]="700";
nomatchdiv.style.display="none";
list.appendChild(nomatchdiv);

timerid = setInterval(updatetime, 10);
function updatetime() {
    let listchilds = list.children;
    for (let i = 1; i < listchilds.length; i++) {
        let quesid=(listchilds[i].querySelector(".myclass")).textContent;
        let timer=listchilds[i].querySelector(".mytimer");
        for (let j = 0; j < dataarray.length; j++) {
            if(dataarray[j].id== quesid)
            {
            let timeinms = Date.now() - +dataarray[j].id;
            let seconds = 0, minutes = 0, hours = 0, days = 0;
            if (timeinms < 1000) {
                timer.innerHTML="Just now";
            }
            else {
                seconds = Math.floor(timeinms / 1000);
                if (seconds < 10) {
                    timer.innerHTML="Just now";
                }
                else {
                    if (seconds < 60) {
                        timer.innerHTML=`${seconds} seconds ago`;
                    }
                    else {
                        minutes = Math.floor(seconds / 60);
                        if (minutes < 60) {
                            timer.innerHTML=`${minutes} minutes ago`;
                        }
                        else {
                            hours = Math.floor(minutes / 60);
                            if (hours < 24) {
                                timer.innerHTML=`${hours} hours ago`;
                            }
                            else {
                                days = Math.floor(hours / 24);
                                timer.innerHTML=`${days} days ago`;
                            }
                        }
                    }
                }
            }
        }
        }
    }
}
newquesbtn.addEventListener("click", function () {
    const responseform = document.getElementById("responseform");
    const newquesform = document.getElementById("questionform");
    responseform.style.display = "none";
    newquesform.style.display = "block";
})
/********** resolve event listener***********/
resolvebtn.addEventListener("click", resolveQuestion);
/********** add response event listener***********/
addresbtn.addEventListener("click", addResponse);
/**************** Submit question event listener *******************/
submitques.addEventListener("click", addNewQuestion);
/**************** Search bar event listener *******************/
searchbar.addEventListener("keyup", onsearchbar);

/**************** window load event listener *******************/
window.addEventListener("load", getquestions);
function getquestions() {
    console.log("window loaded");
    let data = JSON.parse(localStorage.getItem("Questionlist"));
    if (data) {
        dataarray = data;
        dataarray.forEach(function (onequestion) {
            displayToList(onequestion.subject, onequestion.question, onequestion.id, onequestion.isfavourite);
        })
    }
}
function onsearchbar(event) {
    nomatchdiv.style.display="none";
    let count = 0;
    const searchitem = searchbar.value;
    let listchilds=list.children;
    for(i=1;i<listchilds.length;i++){
        let sub=listchilds[i].querySelector("h3").textContent;
        let ques=listchilds[i].querySelector(".myquestion").textContent;
        if(sub.includes(searchitem) || ques.includes(searchitem))
        {
            listchilds[i].style["display"]="block";
            count++;
        }
        else{
             listchilds[i].style["display"]="none";
        }
    }
    if(!count){
        nomatchdiv.style.display="block";
    }
}
function addNewQuestion() {
    const subject = document.getElementById("subject");
    const question = document.getElementById("question");
    const id = Date.now();
    let sub = subject.value.trim();
    let ques = question.value.trim();
    console.log(sub,ques);
    let isfavourite = false;
    if (sub && ques) {
        saveToLocalStorage(sub, ques, id, isfavourite);
        displayToList(sub, ques, id, isfavourite);
    }
    else {
        alert("please enter subject and question");
    }
    subject.value = "";
    question.value = "";
}

function displayToList(subject, question, id, favflag) {
    const queslist = document.getElementById("list");
    const div = document.createElement("div");
    const inlistsub = document.createElement("h3");
    const inlistques = document.createElement("p");
    const quesid = document.createElement("p");
    const responses = document.getElementById("responses");
    const heartbtn = document.createElement("i");
    const timespan = document.createElement("p");
    timespan.classList.add("mytimer");
    // let timeid=setInterval(updatetimer,10);
    function updatetimer() {
        let timeinms = Date.now() - id;
        let seconds = 0, minutes = 0, hours = 0, days = 0;
        if (timeinms < 1000) {
            timespan.innerHTML = "Just now";
        }
        else {
            seconds = Math.floor(timeinms / 1000);
            if (seconds < 10) {
                timespan.innerHTML = "Just now";
            }
            else {
                if (seconds < 60) {
                    timespan.innerHTML = `${seconds} seconds ago`;
                }
                else {
                    minutes = Math.floor(seconds / 60);
                    if (minutes < 60) {
                        timespan.innerHTML = `${minutes} minutes ago`;
                    }
                    else {
                        hours = Math.floor(minutes / 60);
                        if (hours < 24) {
                            timespan.innerHTML = `${hours} hours ago`;
                        }
                        else {
                            days = Math.floor(hours / 24);
                            if (days < 30) {
                                timespan.innerHTML = `${days} days ago`;
                            }
                            else {
                                let month = Math.floor(days / 30);
                                if (month < 12) {
                                    timespan.innerHTML = `${month} months ago`;
                                }
                                else {
                                    let year = Math.floor(month / 12);
                                    timespan.innerHTML = `${year} years ago`;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    heartbtn.setAttribute("class", "fa-solid fa-heart");
    heartbtn.style["float"] = "right";
    heartbtn.style["cursor"] = "pointer";
    heartbtn.classList.add("white");
    quesid.innerHTML = id;
    quesid.style.display = "none";
    quesid.classList.add("myclass");
    inlistsub.innerHTML = subject;
    inlistques.innerHTML = question;
    inlistques.classList.add("myquestion");
        if (favflag === true) {
            heartbtn.classList.remove("white");
            heartbtn.classList.add("red");
        }
        else
        {
            heartbtn.classList.add("white"); 
        }
        div.append(heartbtn, inlistsub, inlistques, quesid, timespan, document.createElement("hr"));
    if (favflag === true) {
        console.log(queslist.childNodes);
        queslist.insertBefore(div, queslist.childNodes[2]);
    }
    else {
        queslist.append(div);
    }
    heartbtn.addEventListener("click", function (event) {
        event.stopPropagation();
        console.log(event);
        let target = event.target;
        console.log(target);
        let targetparent = target.parentNode;
        dataarray.forEach(function (onequestion) {
            if (onequestion.id === id) {
                if (onequestion.isfavourite === false) {
                    target.classList.remove("white");
                    target.classList.add("red");
                    onequestion.isfavourite = true;
                    list.insertBefore(targetparent, list.childNodes[2]);
                }
                else {
                    event.target.classList.remove("red"); 
                    event.target.classList.add("white");
                    onequestion.isfavourite = false;
                    list.appendChild(targetparent);
                }
            }
        })
        localStorage.setItem("Questionlist", JSON.stringify(dataarray));
    })

    div.addEventListener("click", function (event) {
        console.log("in div");
        responses.innerHTML = "";   
        const newquesform = document.getElementById("questionform");
        const responseform = document.getElementById("responseform");
        const inressubject = document.getElementById("showsubinres");
        const inresquestion = document.getElementById("showquesinres");
        const questionid = document.getElementById("questionid");
        questionid.innerHTML = id;
        inressubject.innerHTML = subject;
        inresquestion.innerHTML = question;
        responseform.style.display = "block";
        newquesform.style.display = "none";
        let requireddata = dataarray.filter(function (onequestion) {
            return onequestion.id === id;
        })
        let prevresponses = requireddata[0].responses;
        prevresponses.forEach(function (oneprevres) {
            const username = document.createElement("h3");
            const res = document.createElement("p");
            const resid = document.createElement("p");
            const like = document.createElement("span");
            const dislike = document.createElement("span");
            const likevalue = document.createElement("span");
            const dislikevalue = document.createElement("span");
            resid.innerHTML = oneprevres.responseid;
            resid.style.display = "none";
            like.style["float"] = "right";
            dislike.style["float"] = "right";
            like.style["cursor"] = "pointer";
            dislike.style["cursor"] = "pointer";
            like.innerHTML = "&#128077";
            dislike.innerHTML = "&#128078";
            likevalue.style["float"] = "right";
            dislikevalue.style["float"] = "right";
            likevalue.innerHTML = oneprevres.like;
            dislikevalue.innerHTML = oneprevres.dislike;
            username.innerHTML = oneprevres.name;
            res.innerHTML = oneprevres.comment;
            const oneresdiv = document.createElement("div");
            oneresdiv.style.backgroundColor = "#E5E4E2";
            oneresdiv.append(dislikevalue, dislike, likevalue, like, username, res, resid, document.createElement("hr"));
            responses.append(oneresdiv);
            like.addEventListener("click", function (event) {
                let insposition;
                console.log(responses);
                let parentnode = event.target.parentNode;
                let targetid = parentnode.childNodes[6].textContent;
                console.log(targetid);
                dataarray.forEach(function (onequestion) {
                    if (onequestion.id === +id) {
                        console.log(onequestion);
                        onequestion.responses.forEach(function (oneresponse) {
                            if (oneresponse.responseid === +targetid) {
                                oneresponse.like = oneresponse.like + 1;
                                parentnode.childNodes[2].innerHTML = oneresponse.like;
                            }
                        })
                        onequestion.responses.sort(function (k1, k2) {
                            if ((k1.like - k1.dislike) < (k2.like - k2.dislike)) {
                                console.log("greter");
                                return 1;
                            }
                            else if ((k1.like - k1.dislike) > (k2.like - k2.dislike)) {
                                console.log("lesser");
                                return -1;
                            }
                            else {
                                return 0;
                            }
                        })
                        for (var i = 0; i < onequestion.responses.length; i++) {
                            if (onequestion.responses[i].responseid === +targetid) {
                                insposition = i;
                            }
                        }
                        console.log(insposition);
                        console.log(responses, parentnode, responses.childNodes[insposition]);
                        responses.insertBefore(parentnode, responses.childNodes[insposition]);
                    }
                })
                localStorage.setItem("Questionlist", JSON.stringify(dataarray));
            })
            dislike.addEventListener("click", function (event) {
                let insposition;
                let parentnode = event.target.parentNode;
                let targetid = parentnode.childNodes[6].textContent;
                console.log(targetid);
                dataarray.forEach(function (onequestion) {
                    if (onequestion.id === +id) {
                        console.log(onequestion);
                        onequestion.responses.forEach(function (oneresponse) {
                            if (oneresponse.responseid === +targetid) {
                                oneresponse.dislike = oneresponse.dislike + 1;
                                parentnode.childNodes[0].innerHTML = oneresponse.dislike;
                            }
                        })
                        onequestion.responses.sort(function (k1, k2) {
                            if ((k1.like - k1.dislike) < (k2.like - k2.dislike)) {
                                console.log("greter");
                                return 1;
                            }
                            else if ((k1.like - k1.dislike) > (k2.like - k2.dislike)) {
                                console.log("lesser");
                                return -1;
                            }
                            else {
                                return 0;
                            }
                        })
                        for (var i = 0; i < onequestion.responses.length; i++) {
                            if (onequestion.responses[i].responseid === +targetid) {
                                insposition = i;
                            }
                        }
                        console.log(insposition);
                        console.log(responses, parentnode, responses.childNodes[insposition]);
                        responses.insertBefore(responses.childNodes[insposition], parentnode);
                    }
                })
                localStorage.setItem("Questionlist", JSON.stringify(dataarray));
            })
        })
    })
}
function saveToLocalStorage(subject, question, id, favflag) {
    let obj = {
        id: id,
        subject: subject,
        question: question,
        responses: [],
        isfavourite: favflag,
    }
    dataarray.push(obj);
    localStorage.setItem("Questionlist", JSON.stringify(dataarray));
}
function resolveQuestion() {
    let question = document.getElementById("showquesinres").textContent;
    const responseform = document.getElementById("responseform");
    const newquesform = document.getElementById("questionform");
    const id = document.getElementById("questionid").textContent;
    console.log("good");
    let list = document.getElementById("list");
    let nodes = list.childNodes;
    nodes.forEach(function (onenode) {
        console.log(onenode);
        const a = onenode.childNodes[3]?.textContent;
        if (a === id) {
            console.log("me a gya")
            onenode.remove();
        }
    })
    let requireddata = dataarray.filter(function (onequestion) {
        return onequestion.id !== +id;
    })

    dataarray = requireddata;
    localStorage.setItem("Questionlist", JSON.stringify(dataarray));
    responseform.style.display = "none";
    newquesform.style.display = "block";
}
function addResponse() {
    let responseid = Date.now();
    const name = document.getElementById("name");
    const comment = document.getElementById("comment");
    let question = document.getElementById("showquesinres").textContent;
    const id = document.getElementById("questionid").textContent;
    let username = name.value.trim();
    let usercomment = comment.value.trim();
    if (username && usercomment) {
        const username = document.createElement("h3");
        const res = document.createElement("p");
        const resid = document.createElement("p");
        resid.innerHTML = responseid;
        resid.style.display = "none";
        const like = document.createElement("span");
        const dislike = document.createElement("span");
        const likevalue = document.createElement("span");
        const dislikevalue = document.createElement("span");
        like.style["float"] = "right";
        dislike.style["float"] = "right";
        like.style["cursor"] = "pointer";
        dislike.style["cursor"] = "pointer";
        like.innerHTML = "&#128077";
        dislike.innerHTML = "&#128078";
        likevalue.style["float"] = "right";
        dislikevalue.style["float"] = "right";
        likevalue.innerHTML = 0;
        dislikevalue.innerHTML = 0;
        username.innerHTML = name.value;
        res.innerHTML = comment.value;
        const oneresdiv = document.createElement("div");
        oneresdiv.style.backgroundColor = "#E5E4E2";
        oneresdiv.append(dislikevalue, dislike, likevalue, like, username, res, resid, document.createElement("hr"));
        responses.append(oneresdiv);
        console.log(question);
        dataarray.forEach(function (onequestion) {
            if (onequestion.id === +id) {
                const obj = {
                    name: name.value,
                    comment: comment.value,
                    like: 0,
                    dislike: 0,
                    responseid: responseid,
                }
                onequestion.responses.push(obj);
            }
        })
        localStorage.setItem("Questionlist", JSON.stringify(dataarray));
        name.value = "";
        comment.value = "";
        like.addEventListener("click", function (event) {
            let insposition;
            console.log(responses);
            let parentnode = event.target.parentNode;
            let targetid = parentnode.childNodes[6].textContent;
            console.log(targetid);
            dataarray.forEach(function (onequestion) {
                if (onequestion.id === +id) {
                    console.log(onequestion);
                    onequestion.responses.forEach(function (oneresponse) {
                        if (oneresponse.responseid === +targetid) {
                            oneresponse.like = oneresponse.like + 1;
                            parentnode.childNodes[2].innerHTML = oneresponse.like;
                        }
                    })
                    onequestion.responses.sort(function (k1, k2) {
                        if ((k1.like - k1.dislike) < (k2.like - k2.dislike)) {
                            console.log("greter");
                            return 1;
                        }
                        else if ((k1.like - k1.dislike) > (k2.like - k2.dislike)) {
                            console.log("lesser");
                            return -1;
                        }
                        else {
                            return 0;
                        }
                    })
                    for (var i = 0; i < onequestion.responses.length; i++) {
                        if (onequestion.responses[i].responseid === +targetid) {
                            insposition = i;
                        }
                    }
                    console.log(insposition);
                    console.log(responses, parentnode, responses.childNodes[insposition]);
                    responses.insertBefore(parentnode, responses.childNodes[insposition]);
                }
            })
            localStorage.setItem("Questionlist", JSON.stringify(dataarray));
        })
        dislike.addEventListener("click", function (event) {
            let insposition;
            let parentnode = event.target.parentNode;
            let targetid = parentnode.childNodes[6].textContent;
            console.log(targetid);
            dataarray.forEach(function (onequestion) {
                if (onequestion.id === +id) {
                    console.log(onequestion);
                    onequestion.responses.forEach(function (oneresponse) {
                        if (oneresponse.responseid === +targetid) {
                            oneresponse.dislike = oneresponse.dislike + 1;
                            parentnode.childNodes[0].innerHTML = oneresponse.dislike;
                        }
                    })
                    onequestion.responses.sort(function (k1, k2) {
                        if ((k1.like - k1.dislike) < (k2.like - k2.dislike)) {
                            return 1;
                        }
                        else if ((k1.like - k1.dislike) > (k2.like - k2.dislike)) {
                            return -1;
                        }
                        else {
                            return 0;
                        }
                    })
                    for (var i = 0; i < onequestion.responses.length; i++) {
                        if (onequestion.responses[i].responseid === +targetid) {
                            insposition = i;
                        }
                    }
                    responses.insertBefore(responses.childNodes[insposition], parentnode);
                }
            })
            localStorage.setItem("Questionlist", JSON.stringify(dataarray));
        })
    }
    else {
        alert("please enter response as well as name");
    }
}