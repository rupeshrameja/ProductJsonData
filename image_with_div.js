let fetch = document.querySelector("#fetchdatas");
var img, val, selectedvarient;

fetch.addEventListener("click", function () {
  fetch.style.display = "none";

  fetchdata();
});

function fetchdata() {
  const url = `https://sohail-test-store.myshopify.com/products/apple-iphone-11-pro.json`;

  var x = new XMLHttpRequest();
  x.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let imageJsonData = this.response;
      let imagejdata = JSON.parse(imageJsonData);
      let newresult = imagejdata.product.images;
      let images = newresult;
      varaint_images(images);
    }
    function varaint_images(image) {
      let varaintids = [];

      var obj = [];
      var sel = document.querySelector("#selects");
      var select = document.querySelector("#selecter");
      let vids;
      let variantData = {};
      let src;
      var all_images = [];
      let flag = true;
      var variantDivs;
      var imgContainer = document.querySelector("#image");
      var Container = document.querySelector("#images");

      image.forEach((img) => {
        src = img["src"];
        all_images.push(src);
        // console.log(src);
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
            if (varaintids.indexOf(id) === -1) {
              varaintids.push(id);
            }

            if (typeof variantData[id] == "undefined") {
              variantData[id] = [src];
            } else {
              variantData[id].push(src);
            }
          });
        }
      });

      [...new Set(varaintids)].forEach((id) => {
        variantData[id].push(...obj);
      });

      let newVariantsIds = [];
      // console.log(variantData);
      Object.keys(variantData).forEach(function (varaintid) {
        var el = document.createElement("option");
        el.textContent = varaintid;
        el.value = varaintid;

        sel.classList.add("hidden");

        sel.appendChild(el);
      });

      sel.addEventListener("change", function (e) {
        console.log(variantData);

        val = e.target.value;
        indexArr = [];
        selectedvarient = variantData[val];
        console.log(selectedvarient);

        let varaint = [];

        let allChild = document.querySelectorAll(".varinatDiv");

        let neededDiv = document.querySelector("#v_" + val);

        allChild.forEach((child) => {
          child.classList.add("hidden"); //previous hide
        });

        neededDiv.classList.remove("hidden"); //next display
        let imgtarget = neededDiv.querySelector("img");
        imgtarget.dispatchEvent(new Event("mouseover"));
      });

      // varaintids = varaintids.filter((elem, index) => {

      // })

      varaintids.forEach(function (DivId, index) {
        variantDivs = document.createElement("div");
        variantDivs.id = DivId;
        variantDivs.classList.add("buttons");
        let image = variantData[Object.keys(variantData)[index]];
        variantDivs.style.backgroundImage = "url(" + image[0] + ")";
        variantDivs.setAttribute("thisimage", image[0]);
        if (!!!document.querySelector("div[thisimage='" + image[0] + "']")) {
          imgContainer.appendChild(variantDivs);
        }

        variantDivs.addEventListener("click", function (e) {
          let current = e.target.id;

          let index;
          var alloptions = document.querySelectorAll("#selects option");

          alloptions.forEach((option, i) => {
            if (current == alloptions[i].value) {
              index = alloptions[i].index;
            }
          });

          sel.selectedIndex = index;

          sel.dispatchEvent(new Event("change"));
        });
      });
      // }
      let showdiv;
      let divid = document.getElementById("image");
      let childDiv;
      let selected = document.querySelector(".new src");

      // console.log(selected);
      divnewimage = document.createElement("div");
      divnewimage.classList.add("varinat");

      Container.appendChild(divnewimage);

      // console.log(variantData);
      // console.log(Object.keys(variantData));
      // console.log(Object.values(variantData));
      Object.keys(variantData).forEach(function (vid, index) {
        childDiv = document.createElement("div");
        childDiv.classList.add("varinatDiv");

        // console.log(vid);

        childDiv.id = `v_${vid}`;

        childDiv.classList.add("hidden");
        childDiv.style.width = "200px";
        variantData[vid].forEach((src, ind) => {
          img = document.createElement("img");

          img.src = src;

          // img.style = "width: 300px; height:300px;";

          img.addEventListener("mouseover", function (e) {
            var selected_img = document.querySelector(".new");

            if (selected_img) {
              selected_img.classList.remove("new");
            }

            e.target.classList.add("new");
            divnewimage.style.backgroundImage = "url(" + src + ")";
            imgContainer.appendChild(divnewimage);
          });
          divnewimage.addEventListener("mouseover", function (e) {
            e.target.classList.add("zoomImg");
          });
          divnewimage.addEventListener("mouseout", function (e) {
            e.target.classList.remove("zoomImg");
          });

          childDiv.appendChild(img);
          imgContainer.appendChild(childDiv);
        });
      });

      // let a = "a";
      // let b = "b";
      // let c = "c";
      // console.log("Hello 'world'  " + a + "Hello " + b);
      // console.log(`hello "world" 'world' ${a} ${b} ${c}`);

      // document.querySelectorAll(`div[id='${31566491123760}']`);

      var targetdiv = document.querySelectorAll(".buttons");

      targetdiv[0].dispatchEvent(new Event("click"));
    }
  };

  x.open("GET", url, true);
  x.send();
}

fetch.dispatchEvent(new Event("click"));
