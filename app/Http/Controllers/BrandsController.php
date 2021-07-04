<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Brand::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'brand_name' => 'required',
        ]);

        $new_brand = $request->input('brand_name');

        $find_brand = Brand::where('brand_name', $new_brand)->get();

        if ($find_brand->count() >= 1) {
            return response()->json([
                'message' => 'Brand already exists.',
                'status' => false
            ]);
        } else {
            $brand = new Brand;
            $brand->brand_name = $new_brand;
            $brand->save();

            return response()->json([
                'message' => 'Brand successfully saved!',
                'brands' => Brand::all(),
                'status' => true
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Brand::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $brand = Brand::find($id);

        if ($brand) {
            $brand->update($request->all());
            return response()->json([
                'message' => 'Brand successfully updated!',
                'brands' => Brand::all(),
                'status' => true
            ]);
        } else {
            return response()->json([
                'message' => 'Brand not found',
                'status' => false
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $brand = Brand::find($id);

        if ($brand) {
            Brand::destroy($id);

            return response()->json([
                'message' => 'Brand successfully deleted!',
                'brands' => Brand::all(),
                'status' => true
            ]);
        } else {
            return response()->json([
                'message' => 'Brand not found',
                'status' => false
            ]);
        } 
    }

    /**
     * Search for a name
     *
     * @param  str  $brand_name
     * @return \Illuminate\Http\Response
     */
    public function search($brand_name)
    {
        return Brand::where('brand_name', 'like', '%'.$brand_name.'%')->get();
    }
}
