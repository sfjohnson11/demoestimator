"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, ImageIcon } from "lucide-react"

interface PhotoGalleryProps {
  photos: PhotoItem[]
  onAddPhoto: (photo: PhotoItem) => void
  onRemovePhoto: (id: string) => void
  onUpdatePhotoDescription: (id: string, description: string) => void
  disabled?: boolean
}

export interface PhotoItem {
  id: string
  url: string
  description: string
  file?: File
}

export default function PhotoGallery({
  photos,
  onAddPhoto,
  onRemovePhoto,
  onUpdatePhotoDescription,
  disabled = false,
}: PhotoGalleryProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0] && !disabled) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0] && !disabled) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))

    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target?.result as string
        const newPhoto: PhotoItem = {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          url,
          description: "",
          file,
        }
        onAddPhoto(newPhoto)
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <Card className="border border-blue-200 mt-8">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-lg text-blue-800">Project Photos</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="border rounded-md overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.description || "Project photo"}
                  className="w-full h-full object-cover"
                />
                {!disabled && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={() => onRemovePhoto(photo.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="p-2">
                <textarea
                  value={photo.description}
                  onChange={(e) => onUpdatePhotoDescription(photo.id, e.target.value)}
                  placeholder="Add a description..."
                  className="w-full text-sm p-1 border rounded resize-none"
                  rows={2}
                  disabled={disabled}
                />
              </div>
            </div>
          ))}

          {!disabled && (
            <div
              className={`border-2 border-dashed rounded-md flex flex-col items-center justify-center h-48 p-4 transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                id="photo-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="photo-upload"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
              >
                <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center">Drag & drop photos here or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">Supports: JPG, PNG, GIF</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-1" /> Add Photos
                </Button>
              </label>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
