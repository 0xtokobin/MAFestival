const questions = [
  {
    question: "中秋节从哪个朝代开始成为固定的节日？",
    options: ["汉代", "唐代", "宋代", "清代"],
    answer: 1,
  },
  {
    question: "中秋节人们为什么会吃月饼？",
    options: ["庆祝胜利", "为了好运", "传递秘密消息", "纪念古人"],
    answer: 2,
  },
  {
    question: "“嫦娥奔月”是与哪个传统节日有关的？",
    options: ["春节", "端午节", "中秋节", "元宵节"],
    answer: 2,
  },
  {
    question: "中秋节时，人们常常做什么活动来庆祝？",
    options: ["打狮舞", "放风筝", "赏月", "唱春晚"],
    answer: 2,
  },
  {
    question: "中秋节和农历的哪一天相同？",
    options: ["农历正月十五", "农历五月五", "农历七月初七", "农历八月十五"],
    answer: 3,
  },
  {
    question: "哪种动物与中秋节的传统有关？",
    options: ["龙", "兔子", "虎", "鸡"],
    answer: 1,
  },
  {
    question: "传统的月饼的主要填充是什么？",
    options: ["巧克力", "红豆沙", "花生酱", "奶油"],
    answer: 1,
  },
  {
    question: "中秋节赏月时，大家常喝什么酒？",
    options: ["啤酒", "红酒", "白酒", "桂花酒"],
    answer: 3,
  },
  {
    question: "中秋节起源于哪个国家？",
    options: ["韩国", "日本", "中国", "越南"],
    answer: 2,
  },
  {
    question: "中秋节期间的月亮通常是怎样的？",
    options: ["新月", "上弦月", "下弦月", "满月"],
    answer: 3,
  },
];
document.addEventListener("DOMContentLoaded", function () {
  // 当文档加载完成后执行
  const numberElement = document.querySelector("header div:nth-child(1)");
  const questionElement = document.querySelector("header div:nth-child(2)");
  // 选择题目元素
  const optionsElements = document.querySelectorAll("main div");

  let currentQuestionIndex = 0; // 这是当前题目的索引，我们从第一题开始
  let alreadyAnswered = false; //标记是否已经回答了问题
  function displayQuestion() {
    //展示题序
    numberElement.innerText = `第${currentQuestionIndex + 1}/10题`;
    // 设置题目文本
    questionElement.innerText = questions[currentQuestionIndex].question;
    const optionPrefixes = ["A", "B", "C", "D"];
    // 遍历选项元素并设置其文本
    optionsElements.forEach((optionElement, index) => {
      optionElement.innerText = `${optionPrefixes[index]}: ${questions[currentQuestionIndex].options[index]}`;
    });
  }
  //判断答案是否正确
  let correctAnswers = 0;
  let leftcontextAnswers = 0;
  const leftcontextElement = document.querySelector(
    ".left-footer span:nth-child(1)"
  );
  const footertextElement = document.querySelector("footer div:nth-child(1)");
  optionsElements.forEach((optionElement, index) => {
    optionElement.addEventListener("click", function () {
      // 检查是否已经回答了问题
      if (alreadyAnswered) return;

      // 设置标记为 true
      alreadyAnswered = true;
      if (index === questions[currentQuestionIndex].answer) {
        correctAnswers++;
        leftcontextAnswers++;
        //改变选项颜色
        optionElement.style.color = "green";
        leftcontextElement.innerText = `答对${leftcontextAnswers}题目`;
        //如果题目是最后一题
        if (currentQuestionIndex === questions.length - 1) {
          buttonElement.style.display = "none";
          againbutton.style.display = "block";
        } else {
          buttonElement.style.display = "block";
        }
        footertextElement.innerText = "恭喜你答对了!";
        footertextElement.style.display = "block";
      } else {
        //改变选项颜色
        optionElement.style.color = "red";
        //如果题目是最后一题
        if (currentQuestionIndex === questions.length - 1) {
          buttonElement.style.display = "none";
          againbutton.style.display = "block";
        } else {
          buttonElement.style.display = "block";
        }
        footertextElement.innerText = "很遗憾你答错了!";
        footertextElement.style.display = "block";
      }
    });
  });
  // 切换到下一题
  const buttonElement = document.querySelector(".next-btn");
  const allcorrectanswersElement = document.querySelector(".correctanswer");
  const againbutton = document.querySelector(".again");
  buttonElement.addEventListener("click", function () {
    alreadyAnswered = false; // 重置标记
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      // 检查是否还有其他问题
      displayQuestion(); // 如果有，显示下一个问题
      // 重置选项颜色
      optionsElements.forEach((optionElement) => {
        optionElement.style.color = "whitesmoke";
      });
      // 隐藏按钮和文本
      buttonElement.style.display = "none";
      footertextElement.style.display = "none";
    } else {
      // 如果所有问题都已回答，可以在此处添加一些逻辑，如显示分数或结束屏幕等。
      buttonElement.style.display = "none";
      footertextElement.style.display = "none";
      allcorrectanswersElement.style.display = "block";
      allcorrectanswersElement.innerText = `你一共答对了${correctAnswers}道题目!`;
    }
  });
  //再来一次
  againbutton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    // 2. 重置答对题目的计数器
    correctAnswers = 0;
    leftcontextAnswers = 0;
    leftcontextElement.innerText = "";

    // 3. 隐藏"再来一次"按钮，恢复"下一题"按钮
    againbutton.style.display = "none";
    buttonElement.style.display = "none"; // 这里先隐藏，让用户回答问题后再显示

    // 4. 重置所有选项的颜色
    optionsElements.forEach((optionElement) => {
      optionElement.style.color = "whitesmoke";
    });

    // 5. 调用函数来显示第一题
    displayQuestion();

    // 6. 将 alreadyAnswered 设为 false
    alreadyAnswered = false;

    // 7. 隐藏可能出现的答题反馈信息
    footertextElement.style.display = "none";
    allcorrectanswersElement.style.display = "none";
  });
  displayQuestion(); // 调用函数来显示第一题
});
