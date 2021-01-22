#!/usr/bin/env bash
set -e

function main {
    generateChordImages
    generateChordsJs
}

function generateChordImages {
    mkdir -p build/chords

    pwd

    for chordFile in site/chords/*; do
        filename="$(basename -- "$chordFile")"
        filenameWithoutExtension="${filename%.*}"

        docker run \
            -v $(pwd)/site/chords:/input \
            -v $(pwd)/build/chords:/output \
            tinosteinort/chord-renderer "/input/$filename" 150 250 "/output/$filenameWithoutExtension.png"
    done
}

function generateChordsJs {
    target="site/js/modules/chords.js"
    prefix="// GENERATED - do not edit
export const chords = ["
    postfix="];"

    echo "$prefix" > "$target"
    for chordFile in site/chords/*; do
        filename="$(basename -- "$chordFile")"
        filenameWithoutExtension="${filename%.*}"

        echo "    $(chordJsEntry $filenameWithoutExtension)" >> "$target"
    done
    echo "$postfix" >> "$target"
}

function chordJsEntry() {
    chordName=$1
    echo "{name: \"$chordName\", file: \"chords/$chordName.png\"},"
}

main