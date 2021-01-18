import React from 'react';

const SearchBox = (props) => {
    return(
        <div className="col col-sm-4">
            <div class="measure pl5 pr5">
                <input id="name" value ={props.value} 
                            onChange={(event)=> props.setSearchValue(event.target.value)}
                            placeholder="Search by Title" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc" />
            </div>
        </div>
    )
}

export default SearchBox;