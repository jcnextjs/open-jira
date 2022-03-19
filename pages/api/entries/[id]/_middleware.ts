import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { id = '' } = req.page.params!;

    const checkMongoId = new RegExp('^[0-9a-fA-F]{24}$');

    // Note: Actualmente hay un error al llamar moongose.isValidObjectId(id)
    // if (!mongoose.isValidObjectId(id)) {
    if (!checkMongoId.test(id)) {
        return new Response(JSON.stringify({ message: `El id '${id}' no es valido.` }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return NextResponse.next();
}
