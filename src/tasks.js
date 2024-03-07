const queue = [];

function queueTask(task) {
  queue.push(task);
}

const WORKERS_LIMIT = 3;
let WORKERS_BUSY = 0;

function worker(task, complete) {
  const { interval, rate } = task;

  let timer = setInterval(() => {
    if (task.progress >= 100) {
      clearInterval(timer);
      complete();
    } else {
      task.progress += rate;
      console.log(`Task ${task.id} is ${task.progress}% complete`);
    }
  }, interval);
}

function startWorkers() {
  if (queue.length === 0 || WORKERS_BUSY >= WORKERS_LIMIT) {
    return;
  }
  // pick worker limit tasks from the queue
  const tasks = queue.splice(
    0,
    Math.min(WORKERS_LIMIT - WORKERS_BUSY, WORKERS_LIMIT)
  );

  // check if worker limit tasks are available
  tasks.forEach((task) => {
    WORKERS_BUSY += 1;
    console.log("Workers used", WORKERS_BUSY);
    worker(task, () => {
      WORKERS_BUSY -= 1;
      console.log(`Task ${task.id} is complete`);
      console.log("Workers used", WORKERS_BUSY);
      startWorkers();
    });
  });
}

queueTask({ interval: 500, id: 1, progress: 0, rate: 10 });
queueTask({ interval: 1000, id: 2, progress: 0, rate: 10 });
queueTask({ interval: 1000, id: 3, progress: 0, rate: 10 });
queueTask({ interval: 1000, id: 4, progress: 0, rate: 10 });
queueTask({ interval: 1000, id: 5, progress: 0, rate: 10 });
queueTask({ interval: 1000, id: 6, progress: 0, rate: 10 });

window.queueTask = queueTask;
window.startWorkers = startWorkers;
