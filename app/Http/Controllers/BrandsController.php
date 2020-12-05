<?php

namespace App\Http\Controllers;

use App\Brand;
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
        $brands = Brand::all();
        return view('brands.index')->with('brands', $brands);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'name' => 'required',
        ]);

        $new_brand = $request->input('name');

        $find_brand = Brand::where('name', $new_brand)->get();

        if ($find_brand->count() >= 1) {
            return redirect('/brands')->with('brand', json_encode([
                'message' => 'Brand already exists.',
                'type' => 'warning'
            ]));
        } else {
            $brand = new Brand;
            $brand->name = $new_brand;
            $brand->save();

            return redirect('/brands')->with('brand', json_encode([
                'message' => 'Brand successfully saved!',
                'type' => 'success'
            ]));
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
        return response()->json([
            'id' => $id
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $this->validate($request, [
            'name' => 'required',
        ]);

        $update_brand = $request->input('name');

        $find_brand = Brand::where('name', $update_brand)->get();

        if ($find_brand->count() >= 1) {
            return redirect('/brands')->with('brand', json_encode([
                'message' => 'Brand already exists.',
                'type' => 'warning'
            ]));
        } else {
            $brand = Brand::find($id);
            $brand->name = $update_brand;
            $brand->save();

            return redirect('/brands')->with('brand', json_encode([
                'message' => 'Brand successfully updated!',
                'type' => 'success'
            ]));
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
        //
    }
}
