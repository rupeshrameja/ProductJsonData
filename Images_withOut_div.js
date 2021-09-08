let fetch = document.querySelector("#fetchdatas");

fetch.addEventListener("click", function () {
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
      let vid, ids, idd;

      let arrays = [];

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
            arrays.push(id);
            if (typeof variantData[id] == "undefined") {
              variantData[id] = [...obj, src];
            } else {
              variantData[id].push(src);
            }
          });
        }
      });
      arrays.forEach(function (array) {
        var el = document.createElement("option");
        el.textContent = array;
        el.values = array;

        sel.appendChild(el);
      });

      sel.addEventListener("change", function (event) {
        document.getElementById("image").innerHTML = "";

        var val = event.target.value;
        // console.log(event.target.value);
        let varaint = [];

        vImgs = variantData[val];

        vImgs.forEach((src, ind) => {
          img = document.createElement("img");
          img.style.width = "200px";
          img.style.border = "5px solid #ddd";

          img.style.boxShadow = "0 4px 90px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
          img.style.height = "200px";

          img.src = src;
          var imgContainer = document.querySelector("#image");
          imgContainer.appendChild(img);
        });
      });

      sel.dispatchEvent(new Event("change"));
    }
  };

  x.open("GET", url, true);
  x.send();
}
