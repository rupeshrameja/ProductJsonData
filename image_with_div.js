let fetch = document.querySelector("#fetchdatas");

fetch.addEventListener("click", function () {
  fetch.style.display = "none";
  fetchdata();
});
function fetchdata() {
  const url = `https://line-item.myshopify.com/products/shoes.json`;

  var x = new XMLHttpRequest();
  x.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let imageJsonData = this.response;
      let imagejdata = JSON.parse(imageJsonData);
      let newresult = imagejdata["product"];
      let images = newresult["images"];
      varaint_images(images);
    }
    function varaint_images(image) {
      let varaintids = [];

      var obj = [];
      var sel = document.querySelector("#selects");
      let vids;
      let variantData = {};
      let src;
      let flag = true;

      image.forEach((img) => {
        src = img["src"];
        // src = src.replace("https:", "")
        src = src.split("?")[0];
        if (img["variant_ids"].length == 0 && flag) {
          obj.push(img["src"]);
          // console.log(obj);
        }
        if (img["variant_ids"].length > 0) {
          vids = img["variant_ids"];

          flag = false;
        }
        if (vids) {
          vids.forEach((id) => {
            varaintids.push(id);
            if (typeof variantData[id] == "undefined") {
              variantData[id] = [...obj, src];
            } else {
              variantData[id].push(src);
            }
          });
        }
      });

      Object.keys(variantData).forEach(function (varaintid) {
        var el = document.createElement("option");
        el.textContent = varaintid;
        el.values = varaintid;

        sel.appendChild(el);
      });
      // console.log(Object.keys(variantData));

      let showdiv;
      let divid = document.getElementById("image");
      let childDiv;

      console.log(variantData);
      console.log(Object.keys(variantData));
      console.log(Object.values(variantData));
      Object.keys(variantData).forEach(function (vid, index) {
        childDiv = document.createElement("div");
        childDiv.classList.add("varinatDiv");
        // console.log(vid);

        childDiv.id = `v_${vid}`;

        childDiv.classList.add("hidden");
        childDiv.style.width = "200px";
        variantData[vid].forEach((src, ind) => {
          let img = document.createElement("img");

          img.src = src;
          // img.style = "width: 300px; height:300px;";
          img.addEventListener("click", function (e) {
            var selected_img = document.querySelector(".new");

            if (selected_img) {
              selected_img.classList.remove("new");
            }
            e.target.classList.add("new");
          });
          childDiv.appendChild(img);
        });

        var imgContainer = document.querySelector("#image");

        imgContainer.appendChild(childDiv);
      });

      // let a = "a";
      // let b = "b";
      // let c = "c";
      // console.log("Hello 'world'  " + a + "Hello " + b);
      // console.log(`hello "world" 'world' ${a} ${b} ${c}`);

      // document.querySelectorAll(`div[id='${31566491123760}']`);

      sel.addEventListener("change", function (event) {
        var val = event.target.value;
        let varaint = [];

        vImgs = variantData[val];

        let allChild = document.querySelectorAll(".varinatDiv");

        let neededDiv = document.querySelector("#v_" + val);

        allChild.forEach((child) => {
          child.classList.add("hidden"); //previous hide
        });

        neededDiv.classList.remove("hidden"); //next display

        // if (val == childDiv.id) {
        //   childDiv.style.display = "block";
        // } else {
        //   childDiv.style.display = "none";
        // }
      });
      sel.selectedIndex = 1;
      sel.dispatchEvent(new Event("change"));
    }
  };

  x.open("GET", url, true);
  x.send();
}

fetch.dispatchEvent(new Event("click"));
