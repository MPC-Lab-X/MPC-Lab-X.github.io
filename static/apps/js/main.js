let div_container;

const Operate = {
  newPage: () => {
    div_container.innerHTML = "";
    let new_title = document.createElement("h1");
    new_title.innerHTML = document.title;
    let new_pageinfo = document.createElement("p");
    new_pageinfo.innerHTML = document
      .querySelector('meta[name="description"]')
      .getAttribute("content");
    div_container.append(new_title);
    div_container.append(new_pageinfo);
  },

  newInput: (words) => {
    const formIndex = Math.floor(Math.random() * 1000000);
    return new Promise((resolve, reject) => {
      let new_input = document.createElement("div");
      new_input.className = "new_input";

      for (var i = 0; i < words.length; i++) {
        let new_input_label = document.createElement("label");
        new_input_label.className = "new_input_label";
        new_input_label.innerHTML = words[i];
        let new_input_input = document.createElement("input");
        new_input_input.className = "new_input_input";
        new_input_input.id = "input_" + formIndex + "_" + i;
        let break_line = document.createElement("br");
        new_input.append(new_input_label);
        new_input.append(new_input_input);
        new_input.append(break_line);
      }

      let new_input_sb = document.createElement("button");
      new_input_sb.textContent = "Submit";
      new_input_sb.addEventListener("click", function () {
        window_load(false, 0);
        let inputValues = [];
        for (var i = 0; i < words.length; i++) {
          let inputId = "input_" + formIndex + "_" + i;
          let inputElement = document.getElementById(inputId);
          inputValues.push(inputElement.value);
        }
        window_load(true, 900);
        resolve(inputValues);
      });

      new_input.append(new_input_sb);
      let div_container = document.getElementById("container");
      div_container.append(new_input);
    });
  },

  newStart: (start) => {
    let new_HR = document.createElement("hr");
    div_container.append(new_HR);
    let new_start = document.createElement("div");
    new_start.className = "new_start";
    let new_start_p = document.createElement("p");
    new_start_p.innerHTML = start;
    new_start.append(new_start_p);
    div_container.append(new_start);
    return new_start;
  },

  newStep: (step) => {
    let new_step = document.createElement("div");
    new_step.className = "new_step";

    katex.render(step, new_step, { displayMode: true });

    div_container.append(new_step);
  },

  newSolution: (solution) => {
    let new_HR = document.createElement("hr");
    div_container.append(new_HR);
    let new_solution = document.createElement("div");
    new_solution.className = "new_solution";

    katex.render(solution, new_solution, { displayMode: true });

    div_container.append(new_solution);
    return new_solution;
  },

  newGraph: (f) => {
    let new_graph = document.createElement("div");
    new_graph.className = "new_graph";
    new_graph.id = "newGraph";
    new_graph.style.height = "300px";
    div_container.append(new_graph);
    setTimeout(() => {
      initializeDesmos(f, "newGraph");
    }, 400);
    return new_graph;
  },

  newRestart: () => {
    let resetDiv = document.createElement("div");
    resetDiv.className = "resetDiv";
    let resetButton = document.createElement("button");
    resetButton.textContent = "Re-Start";
    resetButton.addEventListener("click", function () {
      div_container.innerHTML = "";
      main();
    });
    resetDiv.append(resetButton);
    div_container.append(resetDiv);
  },
};

function initializeDesmos(function_, targetElementId) {
  var targetDiv = document.getElementById(targetElementId);
  var calculator = Desmos.GraphingCalculator(targetDiv, {
    settings: {
      showToolBar: false,
      expressionsCollapsed: true,
    },
    backgroundColor: "#f0f0f0",
  });

  for (var i = 0; i < function_.length; i++) {
    calculator.setExpression({
      id: "graph" + i,
      latex: function_[i],
      color: Desmos.Colors.BLUE,
    });
  }

  var toggleButton = document.createElement("button");
  toggleButton.id = "toggleButton";
  toggleButton.style.display = "none";
  toggleButton.textContent = "Toggle Expressions";
  targetDiv.appendChild(toggleButton);

  toggleButton.addEventListener("click", function () {
    calculator.updateSettings({
      expressionsCollapsed: !calculator.getState().expressionsCollapsed,
    });
  });

  toggleButton.click();
}

function add_likes(div_) {
  let page_url = window.location.href;
  let Local_like = JSON.parse(localStorage.getItem("Like"));
  if (find_like(page_url) != null) {
    let new_arry = new Array();
    for (let i = 0; i < Local_like.length; i++) {
      if (Local_like[i] != page_url) {
        new_arry.push(Local_like[i]);
      }
    }
    Local_like = new_arry;
  } else {
    Local_like.push(page_url);
  }
  const userData = {
    Name: localStorage.getItem("User_Name"),
    Info: localStorage.getItem("User_Info"),
    Gender: localStorage.getItem("User_Gender"),
    Img: localStorage.getItem("User_Img"),
    Like: Local_like,
  };
  serverStorage.setItem("User", localStorage.getItem("UID"), userData);
  localStorage.setItem("Like", JSON.stringify(Local_like));
  if (find_like(window.location.href) != null) {
    div_.style.backgroundColor = "red";
  } else {
    div_.style.backgroundColor = "white";
  }
}

function add_like_click() {
  let like_click = document.createElement("div");
  like_click.className = "like-btn";
  let like_click_i = document.createElement("i");
  if (find_like(window.location.href) != null) {
    like_click_i.style.backgroundColor = "red";
  } else {
    like_click_i.style.backgroundColor = "white";
  }
  like_click_i.id = "like_i";
  like_click_i.className = "like-btn-i";
  like_click.append(like_click_i);
  document.body.append(like_click);
  document.getElementById("like_i").addEventListener("click", function () {
    add_likes(this);
  });
}

window.addEventListener("load", function () {
  div_container = document.getElementById("container");
  setTimeout(() => {
    if (APP.login) {
      add_like_click();
    }
  }, 100);
  main();
});
