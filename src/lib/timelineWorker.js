// class TimelineWorker{
//     timeline: any[];
//     visibleTimeline: any[];
//     message: any;

//     constructor(){
//         this.timeline = []
//         this.visibleTimeline = []
//         this.message

//         self.addEventListener('message', function(e) {
//             self.postMessage(e.data);
//         }, false);
//     }


// }
// export default TimelineWorker

let message = ''
let maxCursorSize = 1000
let canvasHeight = 0
let canvasWidth = 0
let timeline = []
let visibleTimeline = []






const getVisibleTimeline = () => {
    let visibleRangeMin = 0 - maxCursorSize
    let visibleRangeMax = canvasHeight + maxCursorSize
    // visibleTimeline = timeline.filter((x) => x.cursor.y <= visibleRangeMax && x.cursor.y >= visibleRangeMin)
    return timeline.filter((x) => x.cursor.y <= visibleRangeMax && x.cursor.y >= visibleRangeMin)
}

const pushNewMod = (mod) => {
    timeline.unshift(mod)
    self.postMessage({type: 'get_visible_timeline', payload: getVisibleTimeline() })
}



self.addEventListener('message', (e) => {
    // console.log('Worker:', {
    //     type: e.data.type,
    //     payload: e.data.payload,
    // })
    switch(e.data.type){
        case 'new_mod': pushNewMod(e.data.payload); break;

        case 'get_timeline': self.postMessage({type: 'get_timeline', payload: timeline}); break;
        case 'get_visible_timeline': self.postMessage({type: 'get_visible_timeline', payload: getVisibleTimeline() }); break;
            //get_visible_timeline
        default: console.error('no case for timelineWorker:', e.data.type)
    }
    // self.postMessage(e.data);
}, false);
