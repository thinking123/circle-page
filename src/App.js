import React from 'react';
import './App.css';



class Circle{


    constructor(options){
        const def = {
            bgColor:'#FFF',
            secColor:'#3291a8',
            minColor:'#3291a8',
            hourColor:'#3291a8',
            runColor:'yellow',
            attached:'body',
            drawColor:'#22E121',
            endCb:()=>{console.log('end')},
            startTime:new Date().getTime(),
            endTime:new Date().getTime(),
            curTime:new Date().getTime(),
            countDown:''
        }

        this.opts = {...def , ...options};

        let root = document.getElementById(this.opts.attached);
        if(!root){
            root = document.body;
        }

        this.root = root;
        const {width , height} = root.getBoundingClientRect();
        this.width = width;
        this.height = height;
        const radius = Math.min(width , height) - 2;
        this.secRadius = radius * (1/6.0);
        this.minRadius = radius * (2/6.0);
        this.hourRadius = radius * (3/6.0);
        this.center = {
            x:width/2,
            y:height/2
        };

        const canvas = document.createElement('canvas');
        root.appendChild(canvas);
        canvas.id = this.getId();
        canvas.width = width;
        canvas.height = height;
        canvas.style.zIndex = 100;

        const ctx = canvas.getContext('2d');
        this.ctx = ctx;


        // ctx.beginPath();
        // ctx.moveTo(this.center.x , this.center.y);
        // ctx.strokeStyle =




    }

    degreeToRadian(deg){
        return (Math.PI/180)*deg;
    }
    renderBg(){
        const {x , y} = this.center;
        const c = this.ctx;
        const deg360 = this.degreeToRadian(360);
        this.renderCircle(0 , deg360 , this.secRadius, this.opts.runColor);
        this.renderCircle(0 , deg360 , this.minRadius, this.opts.runColor);
        this.renderCircle(0 , deg360 , this.hourRadius, this.opts.hourColor);
    }
    renderCircle(start , end  , r , strokeStyle , lineWidth = 2){
        const {x , y} = this.center;
        const c = this.ctx;
        const offset = this.degreeToRadian(-90);
        c.beginPath();
        c.lineWidth = lineWidth;
        c.strokeStyle = strokeStyle;
        c.arc(x , y , r , offset + start , offset + end);
        c.stroke();
        c.closePath();
    }


    getId(){
        return 'canvas';
    }
    render(){
        this.start = new Date().getTime();

        this.renderTime();
    }
    twoBits(b){
        if(b < 10){
            return `0${b}`;
        }
        return `${b}`;
        // return `${b > 9 ? b : }`;
    }

    formatTime([h , m , s]){
        s = Math.floor(s);
        m = Math.floor(m);
        h = Math.floor(h);
        return `${this.twoBits(h)}:${this.twoBits(m)}:${this.twoBits(s)}`;
    }
    renderTime(){
        const {countDown} = this.opts;
        const diff = (new Date().getTime()) - this.start;

        const [h , m , s] = this.timeToDate(diff);
        const strTime = this.formatTime([h , m , s]);

        if(s <= 1000){
            this.ctx.clearRect(0 , 0 , this.width , this.height);
        }

        this.ctx.fillText(strTime , this.center.x , this.center.y);
        this.ctx.textAlign = 'center';
        this.ctx.font = '48px serif';
        this.ctx.textBaseline = 'middle';
        this.renderBg();
        this.renderSecond(this.degreeToRadian(6 * s) , this.secRadius);
        this.renderSecond(this.degreeToRadian(6 * m) , this.minRadius);
        this.renderSecond(this.degreeToRadian(6 * h) , this.hourRadius);
        if(diff < countDown){
            requestAnimationFrame(this.renderTime.bind(this))
        }
    }
    renderSecond(deg ,r ){
        // const deg = this.degreeToRadian(6 * s);
        this.renderCircle(0 , deg , r , this.opts.drawColor , 6);
    }
    renderHour(){

    }




    timeToDate(time){
        // const t =Math.floor( time / 1000);
        //
        // const h = Math.floor(t / (60 * 60));
        // const m = Math.floor((t - h * 60 * 60) / 60);
        // const s = (time - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000;

        const t = time / 1000;

        const h = t / (60 * 60);
        const m = (t - Math.floor( h) * 60 * 60) / 60;
        const s = (time -Math.floor( h) * 60 * 60 * 1000 - Math.floor( m) * 60 * 1000) / 1000;


        return [h , m , s];
    }

    // render() {
    //     const {id} = this.props;
    //     return (
    //         <canvas id='canvas'>
    //
    //         </canvas>
    //     );
    // }
}


class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ["init item"],
            tit: "title"
        }
    }

    ref = (ref) => {
        alert("ref ")
        this.rf = ref;
        console.log('ref', ref)
    }

    // ƒ(t) {
    //     var e, n = 0.call(arguments, 1);
    //     return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
    //         d(t, n, e)
    //     }), t
    // }

    click() {

        // this.setState({tit:this.state.items.length})
        this.state.items = [...this.state.items, "ne items"]
    }

    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);
    }
    componentDidMount() {
        let countDown = this.addMinutes(new Date() , 100);
        countDown = countDown.getTime() - new Date().getTime();
        this.circle = new Circle(
            {
                attached:'rt',
                countDown
            }
        );

        this.circle.render();
    }

    render() {
        const sty = {
            width:'500px',
            height:'800px',
            border:'1px solid green'
        }
        return <div>

            <div id='rt' style={sty}>


            </div>
            <div>
                <button onClick={e => this.click()}>click</button>
            </div>
            <div>{this.state.tit}</div>
            {
                this.state.items.map(item => {
                    return <div>this is itme {item}</div>
                })
            }
        </div>
    }
}

function App() {
    return (
        <div className="App">
            <div>
                <MyPage/>
            </div>
        </div>
    );
}

export default App;
