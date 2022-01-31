//needed for query validation on ticketmaster
const apiKey = '&apikey=ok3DYkVG6O2Y0XirYdHEGBsJSMur8l8G';
// stores current page count
let pageCount = 0;
// gets the pagecount displayed on the screen
let pageCountText = document.getElementById('page-count');


// base url used in fetch events, is later added to 
const baseURL ='https://app.ticketmaster.com/discovery/v2/events.json?';
//store previously used url in this empty string for use in changing the page number
let lastURL = '';


// automatically runs the first fetch when the user loads in
fetchEvents(createUrl());

/// The folowing functions are used in the createURL function that crafts the URL that will be used to fetch results

// identifies if a desired number of results has been supplied by the user and alters the URL 
function selectSize(url,page) {
    const searchSize = document.getElementById('select-size').value;
    //if no input is given, dont change anything, otherwise update the url
    if (searchSize===''){
        return url+'&size=25&page=0';
    } else {
        return url+'&size='+searchSize+'&page='+pageCount;
    }
}

// identifies if a desired category has been supplied by the user and alters the URL 
function selectCategory(url) {
    const searchCategory = document.getElementById('select-category').value;
    // console.log(searchCategory);
    //if no input is given, dont change anything, otherwise update the url
    if (searchCategory===''){
        return url;
    } else {
        return url+'&segmentId='+searchCategory;
    }
}

// identifies if a desired keyword has been supplied by the user and alters the URL 
function selectKeyWords(url) {
    const searchKeyWords = document.getElementById('select-keyword').value;
    //if no input is given, dont change anything, otherwise update the url
    if (searchKeyWords===''){
        return url;
    } else {
        return url+'&keyword='+searchKeyWords;
    }
}

// identifies if a desired startdate has been supplied by the user and alters the URL 
function selectStartDate(url) {
    let selectStartDate = document.getElementById('select-startdate').value;
    //if no input is given, dont change anything, otherwise update the url
    if (selectStartDate===''){
        return url;
    } else {
        return url+'&startDateTime='+selectStartDate+'T00:00:00Z';
    }
}

// identifies if a desired endDate has been supplied by the user and alters the URL 
function selectEndDate(url) {
    const selectEndDate = document.getElementById('select-enddate').value;
    //if no input is given, dont change anything, otherwise update the url
    if (selectEndDate===''){
        return url;
    } else {
        return url+'&endDateTime='+selectEndDate+'T00:00:00Z';
    }
}


// creates and returns url with supplied inputs
function createUrl() {
    const sizedURL = selectSize(baseURL,pageCount);

    const cateURL = selectCategory(sizedURL);

    const keyURL = selectKeyWords(cateURL);

    const startURL = selectStartDate(keyURL);

    const endURL = selectEndDate(startURL);

    return endURL+'&dmaId=345&sort=date,asc'+apiKey;
}

//sorting by selected columns
const nameCol = document.getElementById('name-sort');
const dateCol = document.getElementById('date-sort');
const venueCol = document.getElementById('venue-sort');

let nameColPlaceHolder = 'Name';
let dateColPlaceHolder = 'Date';
let venueColPlaceHolder = 'Venue';


//variables needed to determine what kind of sorting
//global sorting variable determines if there the fetch is being sorted already
let globalSorted = null;
let placeholderGlobalSorted = null;

//individual sorting variables to determine asc or desc
let nameSorted = 0;
let dateSorted = 0;
let venueSorted =0;

//sort by name
nameCol.addEventListener('click',()=>{
    //reset page count
    pageCount=0;
    // check the global sorting variable
    if(globalSorted==='name'){
        // check the column sorting variable
        if (nameSorted===1){
            //update column text and sorting variable
            nameCol.textContent='Name↓';
            nameColPlaceHolder=nameCol.textContent;
            nameSorted+=1;
            //remove all existing results
            clearScreen();
            //create string to update url for sorting
            const sortText = 'sort=name,desc';
            // fetch and display new sorted results
            fetchEvents(createSortedUrl(sortText));    
        } else if (nameSorted===2){
            //reset column text and sorting variable
            nameCol.textContent='Name';
            nameColPlaceHolder=nameCol.textContent;
            nameSorted=0;
            //remove all results
            clearScreen();
            //fetch default results
            fetchEvents(createUrl());
            //reset global sorting variable
            globalSorted=null;
            placeholderGlobalSorted = null;    
        }    
    } else if (globalSorted==='favorites') {

    }else{
        //reset all variable counts
        nameSorted = 0;
        dateSorted = 0;
        venueSorted =0;

        //reset all column names
        nameCol.textContent='Name';
        nameColPlaceHolder=nameCol.textContent;
        dateCol.textContent='Date';
        dateColPlaceHolder=dateCol.textContent
        venueCol.textContent='Venue';
        venueColPlaceHolder=venueCol.textContent

        //update column text and sorting variable
        nameCol.textContent='Name↑';
        nameColPlaceHolder=nameCol.textContent
        nameSorted+=1;
        //update global sorting variable
        globalSorted='name';
        placeholderGlobalSorted = 'name'
        // remove all existings results
        clearScreen();
        // create string to update url for sorting
        const sortText = 'sort=name,asc';
        // fetch and display new sorted results
        fetchEvents(createSortedUrl(sortText));    
    }
})


//sort by date
dateCol.addEventListener('click',()=>{
    //reset page count
    pageCount=0;
    // check the global sorting variable
    if(globalSorted==='date'){
        // check the column sorting variable
        if (dateSorted===1){
            //update column text and sorting variable
            dateCol.textContent='Date↓';
            dateColPlaceHolder=dateCol.textContent;
            dateSorted+=1;
            //remove all existing results
            clearScreen();
            //create string to update url for sorting
            const sortText = 'sort=date,desc';
            // fetch and display new sorted results
            fetchEvents(createSortedUrl(sortText));    
        } else if (dateSorted===2){
            //reset column text and sorting variable
            dateCol.textContent='Date';
            dateColPlaceHolder=dateCol.textContent;

            dateSorted=0;
            //remove all results
            clearScreen();
            //fetch default results
            fetchEvents(createUrl());
            //reset global sorting variable
            globalSorted=null;
            placeholderGlobalSorted = null;        
        }    
    }else if (globalSorted==='favorites'){

    } else{
        //reset all variable counts
        nameSorted = 0;
        dateSorted = 0;
        venueSorted =0;

        //reset all column names
        nameCol.textContent='Name';
        nameColPlaceHolder=nameCol.textContent;
        dateCol.textContent='Date';
        dateColPlaceHolder=dateCol.textContent;
        venueCol.textContent='Venue';
        venueColPlaceHolder=venueCol.textContent;

        //update column text and sorting variable
        dateCol.textContent='Date↑';
        dateColPlaceHolder=dateCol.textContent;
        dateSorted+=1;
        //update global sorting variable
        globalSorted='date';
        placeholderGlobalSorted = 'date';    

        // remove all existings results
        clearScreen();
        // create string to update url for sorting
        const sortText = 'sort=date,asc';
        // fetch and display new sorted results
        fetchEvents(createSortedUrl(sortText));    
    }
})

//sort by venue
venueCol.addEventListener('click',()=>{
    //reset page count
    pageCount=0;
    // check the global sorting variable
    if(globalSorted==='venue'){
        // check the column sorting variable
        if (venueSorted===1){
            //update column text and sorting variable
            venueCol.textContent='Venue↓';
            venueColPlaceHolder=venueCol.textContent;
            venueSorted+=1;
            //remove all existing results
            clearScreen();
            //create string to update url for sorting
            const sortText = 'sort=venueName,desc';
            // fetch and display new sorted results
            fetchEvents(createSortedUrl(sortText));    
        } else if (venueSorted===2){
            //reset column text and sorting variable
            venueCol.textContent='Venue';
            venueColPlaceHolder=venueCol.textContent;
            venueSorted=0;
            //remove all results
            clearScreen();
            //fetch default results
            fetchEvents(createUrl());
            //reset global sorting variable
            globalSorted=null;   
            placeholderGlobalSorted = null;     
        }    
    }else if (globalSorted==='favorites') {

    } else{
        //reset all variable counts
        nameSorted = 0;
        dateSorted = 0;
        venueSorted =0;

        //reset all column names
        nameCol.textContent='Name';
        nameColPlaceHolder=nameCol.textContent;
        dateCol.textContent='Date';
        dateColPlaceHolder=dateCol.textContent;
        venueCol.textContent='Venue';
        venueColPlaceHolder=venueCol.textContent;

        //update column text and sorting variable
        venueCol.textContent='Venue↑';
        venueColPlaceHolder=venueCol.textContent;
        venueSorted+=1;
        //update global sorting variable
        globalSorted='venue';
        placeholderGlobalSorted = 'venue';    
        // remove all existings results
        clearScreen();
        // create string to update url for sorting
        const sortText = 'sort=venueName,asc';
        // fetch and display new sorted results
        fetchEvents(createSortedUrl(sortText));    
    }
})


//create new url to fetch data provided in the specified sorting arrangement
function createSortedUrl (sortText) {
    const sizedURL = selectSize(baseURL,pageCount);

    const cateURL = selectCategory(sizedURL);

    const keyURL = selectKeyWords(cateURL);

    const startURL = selectStartDate(keyURL);

    const endURL = selectEndDate(startURL);

    return endURL+'&dmaId=345&'+sortText+apiKey;
}

// gets the input form for desired search filters
const form = document.getElementById('select-form');
// adds an event listening for search filter inputs
form.addEventListener('submit', ()=>{
    event.preventDefault();
    //find existing results and remove to clear the screen
    const resultBar = document.getElementById('table-body');
    resultBar.remove();
    
    //create new table body element to add and display results on the screen
    const ticketTable= document.getElementById('result-table');
    const tableBody = document.createElement('tbody');
    tableBody.id='table-body';
    ticketTable.appendChild(tableBody);

    //reset the page count to 0 for new search and update the page count text on the screen
    pageCount=0;
    pageCountText.textContent=`Page: 1`

    fetchEvents(createUrl());
})


// function used to fetch events results
function fetchEvents(URL){
    // sets the lastURL to the last URL for use in changing page count later
    lastURL = URL;
    // get event data from database and then iterate through results and update the information displayed on the screen
    fetch(URL)
    .then(resp => resp.json())
    .then(
        tickets=> {
            // find table element for results to display on
            const table = document.getElementById('table-body');
            tickets['_embedded'].events.forEach(ticket=>{
                // console.log(ticket);
                const tr = document.createElement('tr');
                tr.className='ticket';
                table.appendChild(tr);

                // add favorite button to add event to favorites when clicked
                const favButton = document.createElement('button');
                favButton.className='fav-add-btn'
                favButton.textContent='X';
                // add event listener to add ticket information to database
                favButton.addEventListener('click',()=> {
                    // identify ticket 
                    const evt = event.target.parentNode.childNodes;
                    //store event information 
                    const eventName = evt[1].textContent;
                    const eventCat = evt[2].textContent;
                    const eventDate= evt[3].textContent;
                    const eventTime = evt[4].textContent;
                    const eventVenue = evt[5].textContent;
                    const eventPrice = evt[6].textContent;
                    const eventURL = evt[7].eventURL;
                    // post new favorite event to database
                    addFavorite(eventName,eventCat,eventDate,eventTime,eventVenue,eventPrice,eventURL);
                    event.target.style.background='#4f585e';
                })
                tr.appendChild(favButton);

                //create name element for ticket element 
                const name = document.createElement('td');
                name.textContent=ticket.name;
                name.className='ticket-var'
                tr.appendChild(name);

                //create category element for ticket element that if undefined, is set as misc
                const category = document.createElement('td');
                if (ticket['_embedded'].attractions===undefined) {
                    category.textContent='Misc';
                } else {
                    category.textContent=ticket['_embedded'].attractions[0].classifications[0].segment.name;
                }
                category.className='ticket-cat';
                tr.appendChild(category);
                
                //creates date element for ticket element that provides the date of the event in an easily readable format
                const dateTime = document.createElement('td');
                dateTime.textContent=ticket.dates.start.dateTime;
                // if date information is not supplied for event, value is set as to be announced
                if (dateTime.textContent===''){
                    dateTime.textContent='TBA';
                } else {
                // get date information and format into easily readable form
                    let date = new Date(dateTime.textContent);
                    let year = date.getFullYear();
                    let month = date.getMonth();
                    let day = date.getDate();
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                    ];
                    let dateMsg = `${monthNames[month]} ${day}, ${year}`;
                    dateTime.textContent=dateMsg;
                }
                dateTime.className='ticket-date';
                tr.appendChild(dateTime);

                //creates time element for ticket element that provides the date of the event in an easily readable format
                const time = document.createElement('td');
                // if time information is not supplied for event, value is set as to be announced
                if (dateTime.textContent==='TBA') {
                    time.textContent= 'TBA';
                } else {
                    // time information must be reformatted into readable form factor
                    const time1 = ticket.dates.start.dateTime.split('T')[1].split('Z')[0]; // 23:00:00
                    const newTime = time1.split(':'); // [23,00,00]
                    let hour = parseInt(newTime[0]); //23
                    let minute = newTime[1];
                    // convert from military time
                    if (hour > 5) {
                        hour-=5;                        
                        if (hour>12){
                            const newHour = parseInt(hour)-12;
                            const bestTime = newHour +':'+ minute + ' PM'
                            if (bestTime==='00:00'){
                                time.textContent= 'TBA'
                            } else {
                                time.textContent= bestTime;    
                                }
        
                            } else {
                                const bestTime = parseInt(hour)+':'+ minute + ' AM'
                                if (bestTime==='00:00'){
                                    time.textContent= 'TBA'
                                } else {
                                    time.textContent= bestTime;    
                                    }
                                }

                        } else if (hour<=5){
                        hour+=19;
                        const minute = newTime[1];
                        if (hour>12){
                            const newHour = parseInt(hour)-12;
                            const bestTime = newHour +':'+ minute + ' PM'
                            if (bestTime==='00:00'){
                                time.textContent= 'TBA'
                             } else {
                                  time.textContent= bestTime;    
                                }
        
                        } else {
                            const bestTime = parseInt(hour)+':'+ minute + ' AM'
                            if (bestTime==='00:00'){
                                time.textContent= 'TBA'
                            } else {
                                time.textContent= bestTime;    
                             }
                         }
                        }
                }
                time.className='ticket-time';
                tr.appendChild(time);

                // create venue element for ticket element and display
                const venue = document.createElement('td');
                venue.textContent=ticket['_embedded'].venues[0].name;
                category.className='ticket-ven';
                tr.appendChild(venue);

                //create price element for ticket element and display
                const priceRange = document.createElement('td');
                // if price information is not supplied for event, value is set as to be announced
                if (ticket.priceRanges === undefined){
                    priceRange.textContent='TBA'
                } else {
                    let min = ticket.priceRanges[0].min;
                    let max = ticket.priceRanges[0].max;
                    //if the given min and max are the same, provide one number, otherwise display a range 
                    if (min===max){
                        priceRange.textContent=`$${ticket.priceRanges[0].max}`;
                        } else {
                        priceRange.textContent=`\$${min}-$${max}`
                        }
                    }
                tr.appendChild(priceRange);
                
                // Create buy button to open website to buy tickets upon click
                const buyButton = document.createElement('button');
                buyButton.className='buy-btn'
                buyButton.textContent='Buy';
                buyButton.eventURL = ticket.url;
                // add event listener to open new window 
                buyButton.addEventListener('click',()=> {
                    window.open(ticket.url);
                })
                tr.appendChild(buyButton);
                }
                )
            }
        )
        .catch(error=>{
            // if there is an error in the inputs, reset the forms
            form.reset()
            // fetchEvents(createUrl());
            // alert('ERROR: Date must be in YYYY-MM-DD format')
        })
    }

// forward button -> update results to the next page

//find button to add event listener to
const forwardButton =  document.getElementById('forward-button');
forwardButton.addEventListener('click',()=>{
    // remove previously used page number from url
    const splitURL = lastURL.split('&page=')

    // find table containing previous results and get number of results currently displayed
    const resultBar = document.getElementById('table-body');
    const tableLength = resultBar.childNodes.length;
    // if results are lower than desired or non existant, do not attempt to go to the next page
    if (tableLength <6 | tableLength===0){

    } else {
        // remove all previous results from the page
        resultBar.remove();
        //create new table body element to add new results to
        const ticketTable= document.getElementById('result-table');
        const newTableBody = document.createElement('tbody');
        newTableBody.id='table-body';
        ticketTable.appendChild(newTableBody);
        //update page count and display on screen
        pageCount++;
        pageCountText.textContent=`Page: ${pageCount+1}`;

        // use previous URL with updated page count 
        const updatedURL= splitURL[0]+'&page='+pageCount+'&'+splitURL[1].substring(pageCountLength(pageCount));
        fetchEvents(updatedURL);
    }
}
)

// back button -> update results to the previous page
const backButton =  document.getElementById('back-button');
backButton.addEventListener('click',()=>{
    // remove previously used page number from url
    const splitURL = lastURL.split('&page=')
    // if on the first page, do not attempt to back a page
    if (pageCount===0) {

    } else {
        // find table body element containg previous results and remove to clear the screen
        const resultBar = document.getElementById('table-body');
        resultBar.remove();
    
        //create new table body element to add new results to
        const ticketTable= document.getElementById('result-table');
        const tableBody = document.createElement('tbody');
        tableBody.id='table-body';
        ticketTable.appendChild(tableBody);

        //update page count and display on screen
        pageCount--;
        pageCountText.textContent=`Page: ${pageCount+1}`;

        // use previous URL with updated page count 
        const updatedURL= splitURL[0]+'&page='+pageCount+ '&'+splitURL[1].substring(pageCountLength(pageCount+1));
        fetchEvents(updatedURL);
    }
}
)

// create placeholder value when user attempts to input a desired end date 
const endDateValue =() =>{
    if (document.getElementById('select-enddate').value ===''){
        document.getElementById('select-enddate').value = '2022-12-31';
    } else {

    }
}
// create placeholder value when user attempts to input a desired start date 
const startDateValue =() =>{
    if (document.getElementById('select-startdate').value === ''){
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        //ensure that the day is in the correct format
        cDay = convertDay(cDay);
        let cMonth = currentDate.getMonth() + 1;
        //ensure that the month is in the correct format
        cMonth = convertMonth(cMonth);
        let cYear = currentDate.getFullYear()
        let todaysDate = `${cYear}-${cMonth}-${cDay}`;
        document.getElementById('select-startdate').value = todaysDate;    
    } else {

    }
}

//convert month value into the correct format
// 1 -> 01
const convertMonth = (month) => {
    if (month.toString().length ===1) {
        return month= '0' +1;
    } else {
        return month;
    }
} 

//convert day value into the correct format
// 1 -> 01
const convertDay = (day) => {
    if (day.toString().length ===1) {
        return day = '0' +1;
    } else {
        return day;
    }
} 

//returns the length of the page count
//used in updating the url when changing the page
// if the current page is 3, then the length is 1
// if the current page is 12, then the length is 2
const pageCountLength = (count) =>{ 
    if (count.toString().length ===1){
        return 1
    } else {
        return 2
    }   
}

//changes the state of input forms when ran
const toggleInputs = () => {
    const inputs = document.getElementsByTagName('input');
    for (const input of inputs) {
      input.disabled = !input.disabled;
    }
  }

//changes the state of select forms when ran
const toggleSelects = () => {
    const selects = document.getElementsByTagName('select');
    for (const select of selects) {
      select.disabled = !select.disabled;
    }
  }

//changes the state of the back and forwards buttons when ran
const toggleButtons = () => {
    backButton.disabled=!backButton.disabled;
    forwardButton.disabled=!forwardButton.disabled;
}

const togglePageCount = () => {
    document.getElementById('page-count').className='hidden'
}

// fetch events from favorites database and display 
const favURL = 'http://localhost:3000/favorites'

function fetchFavorites(){
    // sets the lastURL to the last URL for use in changing page count later
    // get event data from database and then iterate through results and update the information displayed on the screen
    fetch(favURL)
    .then(resp => resp.json())
    .then(
        tickets=> {
            const table = document.getElementById('table-body');
            // console.log(tickets)
            tickets.forEach(ticket=>{
                const tr = document.createElement('tr');
                tr.className='ticket';
                tr.favId=ticket.id;
                table.appendChild(tr);

                // add remove favorite button to remove event from favorites when clicked
                const favButton = document.createElement('button');
                favButton.className='fav-del-btn'
                favButton.textContent='X';
                favButton.addEventListener('click',()=>{
                    //removes event from display
                    tr.remove();
                    //removes favorite from database
                    removeFavorite(ticket.id);
                })
                tr.appendChild(favButton);

                //add and display all event information
                
                const favTicketName = document.createElement('td');
                favTicketName.textContent = ticket.name;
                favTicketName.className='ticket-var';
                tr.appendChild(favTicketName);

                const favTicketCategory = document.createElement('td');
                favTicketCategory.textContent = ticket.category;
                favTicketCategory.className='ticket-cat';
                tr.appendChild(favTicketCategory);

                const favTicketDate = document.createElement('td');
                favTicketDate.textContent = ticket.date;
                favTicketDate.className='ticket-date';
                tr.appendChild(favTicketDate);

                const favTicketTime = document.createElement('td');
                favTicketTime.textContent = ticket.time;
                favTicketTime.className='ticket-time';
                tr.appendChild(favTicketTime);

                const favTicketVenue = document.createElement('td');
                favTicketVenue.textContent = ticket.venue;
                favTicketVenue.className='ticket-ven';
                tr.appendChild(favTicketVenue);

                const favTicketPrice = document.createElement('td');
                favTicketPrice.textContent = ticket.price;
                tr.appendChild(favTicketPrice);

                // Create buy button to open new tab with website to purchase tickets 
                const buyButton = document.createElement('button');
                buyButton.className='buy-btn'
                buyButton.textContent='Buy';
                buyButton.eventURL = ticket.url;
                // add event listener 
                buyButton.addEventListener('click',()=> {
                    window.open(ticket.url);
                })
                tr.appendChild(buyButton);
            })
        })
    }

//find favorite button
const showFavoritesButton = document.getElementById('favorites-button');

// determine if the favorites are already being displayed
let favsOnDisplay = false;
// event listener to change viewing status
showFavoritesButton.addEventListener('click',()=>{
    console.log(placeholderGlobalSorted);
    // if the favorites are not being displayed
    if (favsOnDisplay===false) {
        // clear the dispay
        const resultBar = document.getElementById('table-body');
        resultBar.remove();
        //update button
        favsOnDisplay=true;
        showFavoritesButton.textContent='Show All Results'
        showFavoritesButton.className='fav-btn-on'

        // disable all inputs and buttons 
        toggleButtons();
        toggleInputs();
        toggleSelects();
        //remove page count from the screen
        document.getElementById('page-count').className='hidden'
        //disable hover event for submit button
        document.getElementById('select-submit-button').className='';

        //restict columns from sorting 
        globalSorted='favorites';
        //revert changes to column names
        nameCol.textContent='Name';
        dateCol.textContent='Date';
        venueCol.textContent='Venue';

        //add favorites to the display
        const ticketTable= document.getElementById('result-table');
        const newTableBody = document.createElement('tbody');
        newTableBody.id='table-body';
        ticketTable.appendChild(newTableBody);
        fetchFavorites(favURL);

    } else {
        // clear the display
        const resultBar = document.getElementById('table-body');
        resultBar.remove();
        //Update button
        favsOnDisplay=false;
        showFavoritesButton.textContent='Show Favorites';
        showFavoritesButton.className='fav-btn-off';

        // enable all inputs and buttons 
        toggleButtons();
        toggleInputs();
        toggleSelects();
        document.getElementById('page-count').className='';
        //renable hover event for submit button
        document.getElementById('select-submit-button').className='select-submit';


        //enable columns for sorting 
        globalSorted=placeholderGlobalSorted
        //revert changes to columns
        nameCol.textContent=nameColPlaceHolder;
        dateCol.textContent=dateColPlaceHolder;
        venueCol.textContent=venueColPlaceHolder;


        //add all events to the display
        const ticketTable= document.getElementById('result-table');
        const newTableBody = document.createElement('tbody');
        newTableBody.id='table-body';
        ticketTable.appendChild(newTableBody);
        fetchEvents(lastURL)

    }
})

// post new favorite event to database
function addFavorite (tName,tCat,tDate,tTime,tVenue,tPrice,tURL) {
    const formData = {
        name: tName,
        category: tCat,
        date: tDate,
        time: tTime,
        venue: tVenue,
        price: tPrice,
        url: tURL,
      };
      
      const configurationObject = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      };
      
      return fetch(favURL, configurationObject)
        .then(function (response) {
          return response.json();
        })
        .then(function (object) {
          console.log('Successfully Added to the Database')
        })
        .catch(function (error) {
            alert(error.message);
        });
  }

// remove selected event from the favorites database
  function removeFavorite (tId) {
    const delURL = favURL+'/'+tId;
    const configurationObject = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      };
      
      return fetch(delURL, configurationObject)
        .then(function (response) {
          return response.json();
        })
        .then(function (object) {
          console.log('Successfully Removed From the Database')
        })
        .catch(function (error) {
            alert(error.message);
        });
  }
  
//remove all results from the screen
const clearScreen = () => {
    const resultBar = document.getElementById('table-body');
    resultBar.remove();

    //create new table body element to add new results to
    const ticketTable= document.getElementById('result-table');
    const tableBody = document.createElement('tbody');
    tableBody.id='table-body';
    ticketTable.appendChild(tableBody);

}
  