import React from 'react'

export default function CreateListing() {
    return (
        <main className='p-3 max-w-4xl mx-auto ' >
            <h1 className='text-3xl font-semibold text-center my-5' >Create Listing</h1>
                <form className='flex flex-col sm:flex-row gap-4  ' >
                    <div className=" flex flex-col gap-4 flex-1 ">
                        <input type="text" placeholder='Name' id='name'
                            maxLength='62' minLength='10' required
                            className='border p-3 rounded-lg '
                        />
                        <textarea type="text" placeholder='Description' id='description'
                            required className='border p-3 rounded-lg '
                        />
                        <input type="text" placeholder='Address' id='address'
                            required className='border p-3 rounded-lg '
                        />
                        <div className="flex gap-6 flex-wrap  ">
                            <div className="flex gap-2  ">
                                <input type="checkbox" id='sale' className='w-5' />
                                <span>Sell</span>
                            </div>
                            <div className="flex gap-2 ">
                                <input type="checkbox" id='rent' className='w-5' />
                                <span>Rent</span>
                            </div>
                            <div className="flex gap-2 ">
                                <input type="checkbox" id='parking' className='w-5' />
                                <span>Parking spot</span>
                            </div>
                            <div className="flex gap-2 ">
                                <input type="checkbox" id='furnished' className='w-5' />
                                <span>Furnished</span>
                            </div>
                            <div className="flex gap-2 ">
                                <input type="checkbox" id='offer' className='w-5' />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className=" flex gap-6 flex-wrap ">
                            <div className="flex gap-2 items-center ">
                                <input type="number"  id="bedrooms" 
                                    min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  
                                />
                                <p>Beds</p>
                            </div>
                            <div className="flex gap-2 items-center ">
                                <input type="number"  id="baths" 
                                    min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  
                                />
                                <p>Baths</p>
                            </div>
                            <div className="flex gap-2 items-center ">
                                <input type="number"  id="regularPrice" 
                                    min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  
                                />
                                <div className="flex flex-col items-center">
                                    <p>Regular Price</p>
                                    <span className='text-xs' >( $ / month )</span>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center ">
                                <input type="number"  id="discountPrice" 
                                    min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  
                                />
                                <div className=" flex flex-col items-center ">
                                    <p>Discounted Price</p>
                                    <span className='text-xs ' >( $ / month )</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-4 flex-1 ">
                        <p className="font-semibold">Images:
                            <span className='font-normal text-gray-300 ml-2 ' >The First Will be the cover (max 6) </span>
                        </p>
                        <div className="flex gap-4 ">
                            <input type="file" id="images" accept='image/*' multiple
                                className='p-3 border border-gray-300 rounded w-full '
                            />
                            <button className='p-3 border text-green-700 border-green-700
                                rounded uppercase hover:shadow-lg disabled:opacity-50 cursor-pointer'
                            >
                                Upload
                            </button>
                        </div>
                    <button className='p-3 bg-slate-700 text-white
                        text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ' 
                    >
                        Create Listing
                    </button>
                    </div>
                </form>
        </main>
    )
}

//sm: that mean in the small devices 
//mx-auto for bring it to the center
//gap-6: to get a space between checkbox's && flex wrap for for the sm devices 
