const addButton = document.querySelector('.addButton');
const addStatButton = document.querySelector('.addStatButton')
var input = document.querySelector('.input');
var statSelector = document.querySelector('.statSelector');
var stat_input = document.querySelector('.stat_input')
const task_container = document.querySelector('.task_container');
const stat_container = document.querySelector('.stat_container');
const stats = [];
const tasks = [];

class item {
    constructor(itemName) {
        //creates item Div
        this.name = itemName;
        this.createDiv(itemName);
    }

    createDiv(itemName) {
        let input = document.createElement('input');
        input.value = itemName;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = "text";
        this.input = input;

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');
        this.itemBox = itemBox;

        let editButton = document.createElement('button');
        editButton.innerHTML = "EDIT";
        editButton.classList.add('editButton');
        this.editButton = editButton;

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "REMOVE";
        removeButton.classList.add('removeButton');
        this.removeButton = removeButton;

        let doneButton = document.createElement('button');
        doneButton.innerHTML = "DONE"
        doneButton.classList.add('doneButton');
        this.doneButton = doneButton;

        let dropDown = document.createElement('select');
        dropDown.name = "statList";
        dropDown.id = itemName + " statList";
        dropDown.classList.add('statSelector');
        this.statSelector = dropDown;
        dropDown.addEventListener('change', () => {
            this.selected_stat = dropDown.value;
        })

        let dropDownLabel = document.createElement('label');
        dropDownLabel.for = "statList";
        dropDownLabel.innerHTML = "STAT: ";
        dropDownLabel.id = "statLabel";
        let option = document.createElement('option');
        option.value = "-";
        option.innerHTML = "-";
        option.selected = "selected";
        dropDown.appendChild(option);
        this.dropDownLabel = dropDownLabel;
        for (let i = 0; i < stats.length; i++) {
            let option = document.createElement('option');
            option.value = stats[i].name;
            option.innerHTML = stats[i].name;
            dropDown.appendChild(option);
        };

        task_container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(dropDownLabel);
        itemBox.appendChild(dropDown);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);
        itemBox.appendChild(doneButton);

        editButton.addEventListener('click', () => this.edit(this.input));
        removeButton.addEventListener('click', () => this.remove(this.itemBox));
        doneButton.addEventListener('click', () => this.done(this.input, this.itemBox));
    }

    edit(input) {
        input.disabled = !input.disabled;
        if (input.disabled === false) {
            input.addEventListener('keydown', (e) => {
                if (e.which == 13) {
                    input.disabled = true;
                };
            })
        }
    }

    remove(itemBox) {
        let index = 0;
        for (let b = 0; b < tasks.length; b++) {
            if (tasks[b].name === this.name) {
                index = b;
            };
        }
        tasks.splice(index, 1);
        let stat = 0;
        for (let a = 0; a < stats.length; a++) {
            if (stats[a].name === this.selected_stat) {
                stat = stats[a];
            }
        }
        this.selected_stat = "-";
        update_levels(stat);
        task_container.removeChild(itemBox);
        console.log(tasks);
    }

    done(input, itemBox) {
        if (input.classList.contains('done_item_input')) {
            input.classList.remove('done_item_input');
            input.classList.add('item_input');
            itemBox.classList.remove('done_item');
            itemBox.classList.add('item');
        } else {
            input.classList.remove('item_input');
            input.classList.add('done_item_input');
            itemBox.classList.remove('item');
            itemBox.classList.add('done_item');
        }
        for (let a = 0; a < stats.length; a++) {
            if (stats[a].name === this.selected_stat) {
                update_levels(stats[a]);
            }
        }
    }

    updateStatList(itemBox) {
        itemBox.removeChild(this.statSelector);
        let dropDown = document.createElement('select');
        dropDown.name = "statList";
        dropDown.id = "statList";
        dropDown.classList.add('statSelector')
        
        this.statSelector = dropDown;
        let dropDownLabel = document.createElement('label');
        dropDownLabel.for = "statList";
        dropDownLabel.innerHTML = "Stat: ";
        dropDownLabel.id = "statLabel";
        let option = document.createElement('option');
        option.value = "-";
        option.innerHTML = "-";
        option.selected = "selected";
        dropDown.appendChild(option);
        for (let i = 0; i < stats.length; i++) {
            let option = document.createElement('option');
            option.value = stats[i].name;
            if (option.value === this.selected_stat){
                option.selected = "selected";
            }
            option.innerHTML = stats[i].name;
            dropDown.appendChild(option);
        };
        dropDown.addEventListener('change', () => {
            this.selected_stat = dropDown.value;
        })
        itemBox.insertBefore(dropDown, this.editButton);
    }
}

class stat {
    constructor(statName) {
        this.name = statName;
        this.levelValue;
        this.level = 1;
        this.createDiv(statName);
    }

    createDiv(statName) {
        let input = document.createElement('input');
        input.value = statName;
        input.disabled = true;
        input.classList.add('entered_stat');
        input.type = "text";
        this.input = input;

        let level = document.createElement('strong');
        level.classList.add('levelText');
        level.innerHTML = "Lvl.";

        let levelValue = document.createElement('strong');
        levelValue.classList.add('levelValue');
        levelValue.innerHTML = this.level;
        this.levelValue = levelValue;

        let statBox = document.createElement('div');
        statBox.classList.add('stat');
        this.statBox = statBox;

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "REMOVE";
        removeButton.classList.add('removeButton');
        this.removeButton = removeButton;

        stat_container.appendChild(statBox);
        statBox.appendChild(input);
        statBox.appendChild(level);
        statBox.appendChild(levelValue);
        statBox.appendChild(removeButton);

        removeButton.addEventListener('click', () => this.remove(this.statBox, this.input));
    }

    remove(statBox, input) {
        input.disabled = true;
        for (let b = 0; b < tasks.length; b++) {
            if (tasks[b].selected_stat === this.name) {
                if (tasks[b].itemBox.classList.contains('done_item')) {
                    tasks[b].done(tasks[b].input, tasks[b].itemBox);
                };
                tasks[b].selected_stat = "-"
            };
        };
        for (let a = 0; a < stats.length; a++) {
            if (stats[a].name === input.value) {
                stats.splice(a, 1)
            }
        };
        for (i = 0; i < tasks.length; i++) {
            tasks[i].updateStatList(tasks[i].itemBox);
        }
        stat_container.removeChild(statBox);
    }
}

function check_task() {
    if (input.value != "") {
        const thing = new item(input.value);
        input.value = "";
        tasks.push(thing);
    }
}

function check_stat() {
    if (stat_input.value != "") {
        let thing = new stat(stat_input.value);
        stats.push(thing);
        stat_input.value = "";
        for (i = 0; i < tasks.length; i++) {
            tasks[i].updateStatList(tasks[i].itemBox);
        }
    }
}

function update_levels(stat) {
    stat.level = 1;
    for (let a = 0; a < tasks.length; a++) {
        if (tasks[a].selected_stat === stat.name && tasks[a].itemBox.classList.contains('done_item')) {
            stat.level++;
        }
    }
    stat.statBox.removeChild(stat.levelValue);
    let levelValue = document.createElement('strong');
    levelValue.classList.add('levelValue');
    levelValue.innerHTML = stat.level;
    stat.levelValue = levelValue;
    stat.statBox.insertBefore(levelValue, stat.removeButton);
}

addButton.addEventListener('click', check_task);
addStatButton.addEventListener('click', check_stat);

input.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check_task();
    };
})

stat_input.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check_stat();
    };
})