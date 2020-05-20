var firebaseConfig = {
  apiKey: "AIzaSyDnoeXc06Elx-ajSJLdCU900t5YQbeo0J4",
  authDomain: "websitedicoding.firebaseapp.com",
  databaseURL: "https://websitedicoding.firebaseio.com",
  projectId: "websitedicoding",
  storageBucket: "websitedicoding.appspot.com",
  messagingSenderId: "122157827250",
  appId: "1:122157827250:web:09e998145937b4d4dd75ab"
};

firebase.initializeApp(firebaseConfig);

const rootRef = firebase.database().ref();
const commentsRef = rootRef.child('comments');

document.getElementById("btnSubmitComment").addEventListener("click", function() {

  var newcomment = document.getElementById('txComment').value.replace(/\n/g, "<br>");
  var newPostRef = commentsRef.push();

  newPostRef.set({
    name: document.getElementById('tbName').value.trim(),
    comment: newcomment.trim(),
    frompage: location.pathname,
    when: firebase.database.ServerValue.TIMESTAMP
  });
});

function showpastcomments() {
  var showat = document.getElementById('pastcomments');

  var commentsRef = firebase.database().ref('comments/').orderByChild('frompage').equalTo(location.pathname);
  commentsRef.once('value', function(snapshot) {
    snapshot.forEach(function(itemSnapshot) {

      var itemData = itemSnapshot.val();
      var comment = itemData.comment;
      var name = itemData.name;
      var when = new Date(itemData.when).toLocaleDateString("en-us");
      showat.innerHTML += "<li>" + comment + "<span> -- " + name + " (" + when +
        ")</span></li>";
    })
  })
}

showpastcomments()
