let fetch = document.querySelector("#fetchdatas");
var img, val, selectedvarient;

fetch.addEventListener("click", function () {
  fetch.style.display = "none";

  fetchdata();
});

function fetchdata() {
  // const url = `https://demo.starapps.studio/products/printed-maxi-dress.json`;
  const url = `https://line-item.myshopify.com/products/shoes.json`;
  // const url = `https://sohail-test-store.myshopify.com/products/apple-iphone-11-pro.json`;

  var x = new XMLHttpRequest();
  x.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let imageJsonData = this.response;
      let imagejdata = JSON.parse(imageJsonData);
      let newresult = imagejdata.product.images;
      let images = newresult;
      let optionJson = imagejdata.product.options;

      varaint_images(images, optionJson);
    }
    function varaint_images(image, optionJson) {
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
      var Container;
      var type;
      var buttondiv = document.querySelector("#buttondiv");

      image.forEach((img) => {
        src = img["src"];
        all_images.push(src);

        src = src.split("?")[0];
        if (img["variant_ids"].length == 0 && flag) {
          obj.push(img["src"]);
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

      Object.keys(variantData).forEach(function (varaintid) {
        var el = document.createElement("option");
        el.textContent = varaintid;
        el.value = varaintid;

        sel.classList.add("hidden");

        sel.appendChild(el);
      });

      sel.addEventListener("change", function (e) {
        val = e.target.value;
        indexArr = [];
        selectedvarient = variantData[val];

        let varaint = [];

        let allChild = document.querySelectorAll(".varinatDiv");

        let neededDiv = document.querySelector("#v_" + val);

        allChild.forEach((child) => {
          child.classList.add("hidden"); //previous hide
        });

        neededDiv.classList.remove("hidden"); //next display
        let imgtarget = neededDiv.querySelector("img");
        imgtarget.dispatchEvent(new Event("click"));
      });

      let setType;
      let newVariantsIds;
      var selectedType = document.querySelector("#type");
      optionJson.forEach((optionjs, index) => {
        if (index === 1) {
          types = optionjs["values"];
        }
      });
      for (i = 0; i < types.length; i++) {
        var el = document.createElement("option");
        el.textContent = types[i];
        el.value = types[i];

        selectedType.appendChild(el);
      }

      selectedType.addEventListener("change", function (e) {
        document.querySelectorAll(".buttons").forEach((e) => e.remove());
        setType = e.target.value;
        newVariantsIds = varaintids;
        if (setType == types[0]) {
          newVariantsIds = newVariantsIds.slice(0, 3);
        } else {
          newVariantsIds = newVariantsIds.slice(-3);
        }

        newVariantsIds.forEach(function (DivId, index) {
          variantDivs = document.createElement("div");
          variantDivs.id = DivId;

          variantDivs.classList.add("buttons");
          let image = variantData[Object.keys(variantData)[index]];
          variantDivs.style.backgroundImage = "url(" + image[1] + ")";
          variantDivs.setAttribute("thisimage", image[1]);
          if (!!!document.querySelector("div[thisimage='" + image[1] + "']")) {
            buttondiv.appendChild(variantDivs);
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

          variantDivs.dispatchEvent(new Event("click"));
        });
      });
      selectedType.selectedIndex = 1;
      selectedType.dispatchEvent(new Event("change"));

      let showdiv;
      let divid = document.getElementById("image");
      let childDiv;
      let selected = document.querySelector(".new src");

      divnewimage = document.createElement("div");
      divnewimage.classList.add("varinat");

      Object.keys(variantData).forEach(function (vid, index) {
        childDiv = document.createElement("div");
        childDiv.classList.add("varinatDiv");

        divnewimage.addEventListener("mouseover", function (e) {
          var selected_img = document.querySelector(".zoomImg");

          e.target.classList.add("zoomImg");
        });

        childDiv.id = `v_${vid}`;

        childDiv.classList.add("hidden");
        childDiv.style.width = "200px";
        variantData[vid].forEach((src, ind) => {
          img = document.createElement("img");

          img.src = src;

          img.addEventListener("click", function (e) {
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

      var targetdiv = document.querySelectorAll(".buttons");
    }
  };

  x.open("GET", url, true);
  x.send();
}

fetch.dispatchEvent(new Event("click"));
