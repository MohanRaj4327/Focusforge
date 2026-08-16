import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { createLowlight, common } from 'lowlight';
import {
  BookOpen, Plus, Trash2, Edit2, Check, X,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Heading1, Heading2, Heading3,
  Code, FileCode, Minus, Palette, ChevronRight
} from 'lucide-react';
import { useNotebooks, Notebook } from '../hooks/useNotebooks';

const lowlight = createLowlight(common);

// ─── Toolbar Button ────────────────────────────────────────────────────────────
const ToolBtn: React.FC<{
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, active, title, children }) => (
  <button
    type="button"
    onMouseDown={e => { e.preventDefault(); onClick(); }}
    title={title}
    className={`p-1.5 rounded-md text-xs transition-all duration-150 ${
      active
        ? 'bg-indigo-600 text-white'
        : 'text-slate-400 hover:text-white hover:bg-slate-700'
    }`}
  >
    {children}
  </button>
);

// ─── Editor Toolbar ─────────────────────────────────────────────────────────────
const EditorToolbar: React.FC<{ editor: any }> = ({ editor }) => {
  if (!editor) return null;

  const colors = [
    { label: 'White', value: '#f8fafc' },
    { label: 'Red', value: '#f87171' },
    { label: 'Green', value: '#4ade80' },
    { label: 'Blue', value: '#60a5fa' },
    { label: 'Yellow', value: '#fbbf24' },
    { label: 'Purple', value: '#c084fc' },
    { label: 'Pink', value: '#f472b6' },
    { label: 'Orange', value: '#fb923c' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 px-4 py-2 border-b border-slate-800 bg-[#0b111e]">
      {/* Headings */}
      <ToolBtn title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
        <Heading1 className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
        <Heading2 className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
        <Heading3 className="w-3.5 h-3.5" />
      </ToolBtn>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Text styles */}
      <ToolBtn title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
        <Bold className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
        <Italic className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
        <UnderlineIcon className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')}>
        <Strikethrough className="w-3.5 h-3.5" />
      </ToolBtn>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Lists */}
      <ToolBtn title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
        <List className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
        <ListOrdered className="w-3.5 h-3.5" />
      </ToolBtn>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Code */}
      <ToolBtn title="Inline Code" onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')}>
        <Code className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}>
        <FileCode className="w-3.5 h-3.5" />
      </ToolBtn>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Horizontal rule */}
      <ToolBtn title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="w-3.5 h-3.5" />
      </ToolBtn>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      {/* Text Color */}
      <div className="flex items-center gap-1">
        <Palette className="w-3.5 h-3.5 text-slate-400" />
        {colors.map(c => (
          <button
            key={c.value}
            type="button"
            title={c.label}
            onMouseDown={e => { e.preventDefault(); editor.chain().focus().setColor(c.value).run(); }}
            className="w-4 h-4 rounded-full border border-slate-600 hover:scale-125 transition-transform"
            style={{ backgroundColor: c.value }}
          />
        ))}
        <button
          type="button"
          title="Reset color"
          onMouseDown={e => { e.preventDefault(); editor.chain().focus().unsetColor().run(); }}
          className="w-4 h-4 rounded-full border border-slate-600 bg-slate-700 hover:scale-125 transition-transform text-[8px] text-slate-300 flex items-center justify-center"
        >✕</button>
      </div>
    </div>
  );
};

// ─── Single Notebook Editor ─────────────────────────────────────────────────────
const NotebookEditor: React.FC<{
  notebook: Notebook;
  onUpdate: (id: string, content: string) => void;
}> = ({ notebook, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      TextStyle,
      Color,
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({ placeholder: 'Start typing your notes here… Paste ChatGPT output, write code, anything!' }),
    ],
    content: notebook.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[calc(100vh-280px)] focus:outline-none text-slate-200 leading-relaxed',
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate(notebook.id, editor.getHTML());
    },
  }, [notebook.id]);

  // Update editor when switching notebooks
  useEffect(() => {
    if (editor && editor.getHTML() !== notebook.content) {
      editor.commands.setContent(notebook.content || '');
    }
  }, [notebook.id]);

  return (
    <div className="flex flex-col h-full">
      <EditorToolbar editor={editor} />
      <div className="flex-1 overflow-y-auto px-8 py-6 notebook-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

// ─── Main NotebookPage ──────────────────────────────────────────────────────────
export const NotebookPage: React.FC = () => {
  const { notebooks, createNotebook, updateContent, renameNotebook, deleteNotebook } = useNotebooks();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState('');

  // Auto-select first notebook
  useEffect(() => {
    if (!selectedId && notebooks.length > 0) {
      setSelectedId(notebooks[0].id);
    }
  }, [notebooks]);

  const handleCreate = () => {
    if (!newName.trim()) return;
    const nb = createNotebook(newName.trim());
    setSelectedId(nb.id);
    setNewName('');
    setShowCreate(false);
  };

  const handleRename = (id: string) => {
    if (!renameVal.trim()) return;
    renameNotebook(id, renameVal.trim());
    setRenamingId(null);
  };

  const selectedNotebook = notebooks.find(nb => nb.id === selectedId) ?? null;

  return (
    <div className="flex h-[calc(100vh-100px)] rounded-2xl overflow-hidden border border-slate-800">
      {/* ── Sidebar ── */}
      <div className="w-60 flex-shrink-0 bg-[#080e1c] border-r border-slate-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-white">Notebooks</span>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="New notebook"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* New notebook input */}
        {showCreate && (
          <div className="px-3 py-2 border-b border-slate-800">
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setShowCreate(false); }}
              placeholder="Notebook name..."
              className="w-full px-3 py-1.5 bg-slate-800 border border-indigo-500 rounded-lg text-xs text-white outline-none"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={handleCreate} className="flex-1 py-1 bg-indigo-600 text-xs text-white rounded-lg hover:bg-indigo-500">Create</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 py-1 bg-slate-700 text-xs text-slate-300 rounded-lg hover:bg-slate-600">Cancel</button>
            </div>
          </div>
        )}

        {/* Notebook list */}
        <div className="flex-1 overflow-y-auto py-2">
          {notebooks.length === 0 && (
            <p className="text-xs text-slate-500 px-4 py-6 text-center">
              No notebooks yet.<br />Click + to create one.
            </p>
          )}
          {notebooks.map(nb => (
            <div
              key={nb.id}
              onClick={() => setSelectedId(nb.id)}
              className={`group flex items-center justify-between px-3 py-2 mx-2 rounded-lg cursor-pointer transition-all mb-1 ${
                selectedId === nb.id
                  ? 'bg-indigo-600/20 border border-indigo-500/30'
                  : 'hover:bg-slate-800/60'
              }`}
            >
              {renamingId === nb.id ? (
                <input
                  autoFocus
                  value={renameVal}
                  onChange={e => setRenameVal(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleRename(nb.id); if (e.key === 'Escape') setRenamingId(null); }}
                  onClick={e => e.stopPropagation()}
                  className="flex-1 bg-transparent border-b border-indigo-400 text-xs text-white outline-none"
                />
              ) : (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {selectedId === nb.id && <ChevronRight className="w-3 h-3 text-indigo-400 flex-shrink-0" />}
                  <span className="text-xs text-slate-200 truncate">{nb.name}</span>
                </div>
              )}

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                <button
                  onClick={e => { e.stopPropagation(); setRenamingId(nb.id); setRenameVal(nb.name); }}
                  className="p-0.5 text-slate-400 hover:text-white"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); if (confirm(`Delete "${nb.name}"?`)) { deleteNotebook(nb.id); if (selectedId === nb.id) setSelectedId(null); }}}
                  className="p-0.5 text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-slate-800">
          <p className="text-[10px] text-slate-500">Auto-saved locally · {notebooks.length} notebook{notebooks.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* ── Editor Area ── */}
      <div className="flex-1 bg-[#0a1020] flex flex-col">
        {selectedNotebook ? (
          <>
            {/* Notebook title bar */}
            <div className="flex items-center gap-3 px-8 py-4 border-b border-slate-800">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-bold text-white">{selectedNotebook.name}</h2>
              <span className="text-[10px] text-slate-500 ml-auto">
                Last edited: {new Date(selectedNotebook.updatedAt).toLocaleString()}
              </span>
            </div>
            <NotebookEditor
              key={selectedNotebook.id}
              notebook={selectedNotebook}
              onUpdate={updateContent}
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
            <BookOpen className="w-12 h-12 text-slate-700" />
            <div>
              <p className="text-slate-400 font-semibold">No notebook selected</p>
              <p className="text-xs text-slate-600 mt-1">Create a notebook from the sidebar to get started</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" /> New Notebook
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
