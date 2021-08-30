<?php

namespace App\Http\Controllers;

use App\Models\ProductType;
use Illuminate\Http\Request;

class ProductTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductType::all();
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
            'type' => 'required',
        ]);

        $new_productType = $request->input('type');

        $find_productType = ProductType::where('type', $new_productType)->get();

        if ($find_productType->count() >= 1) {
            return response()->json([
                'message' => 'Product type already exists.',
                'status' => false
            ]);
        } else {
            $productType = new ProductType;
            $productType->type = $new_productType;
            $productType->save();

            return response()->json([
                'message' => 'Product type successfully saved!',
                'productTypes' => ProductType::all(),
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
        //
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
        $prod_type = ProductType::find($id);

        if ($prod_type) {
            $prod_type->update($request->all());
            return response()->json([
                'message' => 'Product type successfully updated!',
                'productTypes' => ProductType::all(),
                'status' => true
            ]);
        } else {
            return response()->json([
                'message' => 'Product type not found',
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
        $type = ProductType::find($id);

        if ($type) {
            ProductType::destroy($id);

            return response()->json([
                'message' => 'Product type successfully deleted!',
                'productTypes' => ProductType::all(),
                'status' => true
            ]);
        } else {
            return response()->json([
                'message' => 'Product type not found',
                'status' => false
            ]);
        } 
    }
}
